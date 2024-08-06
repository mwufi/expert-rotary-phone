"use client";

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePreventDefaultScroll } from './hooks/preventScroll';
import SingleImage from './SingleImage';
import { Image } from './types';
import { usePan } from './hooks/usePanZoom';
import { useImageExplorerStore } from './store';
import { getImages } from './api.server';
import useImagePreloader from './hooks/useImagePreloader';

const ImageExplorer = () => {
    const {
        images, loading, colUpperBounds, colLowerBounds, centralImage,
        translateX, translateY, containerHeight, containerWidth,
        setImages, setLoading, setColUpperBounds, setColLowerBounds,
        setCentralImage, setTranslateX, setTranslateY,
        setContainerHeight, setContainerWidth
    } = useImageExplorerStore();

    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: false,
    });

    usePreventDefaultScroll(e => true);

    const containerRef = useRef<HTMLDivElement>(null);
    const [handleWheel, handleMouseDown] = usePan();
    const columnWidth = 300;
    const numColumns = 7;
    const gutter = 25;

    useEffect(() => {
        if (!colUpperBounds || !colLowerBounds) return;

        const Y_BUFFER = 500;
        const minColumnY = Math.max(...colUpperBounds);
        if (0 - translateY < minColumnY + Y_BUFFER) {
            fetchImages({ above: true });
        }

        const maxColumnY = Math.min(...colLowerBounds);
        const viewportHeight = window.innerHeight;
        if (viewportHeight - translateY > maxColumnY - Y_BUFFER) {
            fetchImages({ above: false });
        }
    }, [translateY, colUpperBounds, colLowerBounds]);

    const fetchImages = useCallback(async ({ above = false } = {}) => {
        if (loading) return;

        setLoading(true);

        let baseline = Array(numColumns).fill(0).map(() => -Math.floor(Math.random() * 301) - 100)
        let newUpperBounds = colUpperBounds || [...baseline];
        let newLowerBounds = colLowerBounds || [...baseline];

        const newImages: Image[] = (await getImages(numColumns * 2, { width: columnWidth })).map((img: Image, i: number) => {
            const column = i % numColumns;
            const height = 400;

            let y;
            if (above) {
                y = newUpperBounds[column] + height + gutter;
                newUpperBounds[column] -= height + gutter;
            } else {
                y = newLowerBounds[column];
                newLowerBounds[column] += height + gutter;
            }
            const x = column * (columnWidth + gutter);
            return {
                ...img,
                column,
                x,
                y,
            };
        });

        setColUpperBounds(newUpperBounds);
        setColLowerBounds(newLowerBounds);
        setImages(above ? [...newImages, ...images] : [...images, ...newImages]);
        setLoading(false);
    }, [loading, colUpperBounds, colLowerBounds, numColumns, columnWidth, gutter, images, setColUpperBounds, setColLowerBounds, setImages, setLoading]);

    const preloadSrcList = useMemo(() => {
        return images.map(img => img.src);
    }, [images]);

    const { imagesPreloaded } = useImagePreloader(preloadSrcList)

    const hasRun = useRef(false);

    useEffect(() => {
        const initialFetch = async () => {
            await fetchImages();
            setCentralImage({
                src: `https://picsum.photos/${columnWidth * 2 + gutter}/${600}?random=${Date.now()}`,
                width: columnWidth * 2 + gutter,
                key: 'central-image',
                height: 600,
                column: 3,
                x: 0,
                y: 0,
            });
        };

        if (!hasRun.current) {
            initialFetch();
            hasRun.current = true;
        }
    }, []);

    useEffect(() => {
        if (inView && !loading) {
            fetchImages();
        }
    }, [inView, loading, fetchImages]);

    const transformedImages = useMemo(() => {
        if (!centralImage) return [...images];

        const getIntersections = (columnNumber) => {
            const colImages = images.filter(img => img.column === columnNumber).sort((a, b) => a.y - b.y);

            let topIndex = -1;
            let bottomIndex = colImages.length;

            for (let i = 0; i < colImages.length; i++) {
                if (colImages[i].y + colImages[i].height > centralImage.y - gutter) {
                    topIndex = i;
                    bottomIndex = i + 1;
                    break;
                }
            }

            const topAmount = topIndex !== -1
                ? (centralImage.y - gutter) - (colImages[topIndex].y + colImages[topIndex].height)
                : 0;
            const bottomAmount = bottomIndex < colImages.length
                ? (colImages[bottomIndex].y - gutter) - (centralImage.y + centralImage.height)
                : 0;

            return [
                { index: topIndex, amount: topAmount },
                { index: bottomIndex, amount: bottomAmount }
            ];
        };

        const intersections = {
            3: getIntersections(3),
            4: getIntersections(4)
        };

        let transformedImages = [];
        for (let img of images) {
            if (img.column === 3 || img.column === 4) {
                const [topIntersection, bottomIntersection] = intersections[img.column];
                const imgIndex = images.filter(i => i.column === img.column).indexOf(img);

                if (imgIndex <= topIntersection.index) {
                    transformedImages.push({ ...img, y: img.y + topIntersection.amount });
                } else if (imgIndex >= bottomIntersection.index) {
                    transformedImages.push({ ...img, y: img.y - bottomIntersection.amount });
                } else {
                    transformedImages.push(img);
                }
            } else {
                transformedImages.push(img);
            }
        }
        return transformedImages;
    }, [images, centralImage, gutter]);

    const positionImages = (images: Image[]) => {
        const containerWidth = containerRef.current?.clientWidth || (typeof window !== 'undefined' && window.innerWidth) || 700;

        const wrapColumns = (img: Image) => {
            const X_BUFFER = 0 * columnWidth;

            let realLeft = img.x + translateX;
            let realRight = img.x + columnWidth + translateX;

            while (realRight < 0 - X_BUFFER) {
                img.x += (numColumns) * (columnWidth + gutter);
                realRight = img.x + columnWidth + translateX;
            }
            while (realLeft > containerWidth + X_BUFFER) {
                img.x -= (numColumns) * (columnWidth + gutter);
                realLeft = img.x + translateX;
            }
        };

        if (centralImage) {
            centralImage.x = 3 * (columnWidth + gutter);
            centralImage.y = 0;
            wrapColumns(centralImage);
        }

        images.forEach((img) => {
            wrapColumns(img);
        });

        const maxHeight = Math.max(...images.reduce((acc, img) => {
            acc[img.column] = (acc[img.column] || 0) + img.height + gutter;
            return acc;
        }, new Array(numColumns).fill(0)));

        return { positionedImages: images, maxHeight };
    };

    const { positionedImages, maxHeight } = positionImages(transformedImages);

    useEffect(() => {
        const updateContainerDimensions = () => {
            if (typeof window !== 'undefined') {
                setContainerHeight(window.innerHeight);
                setContainerWidth(window.innerWidth);
            }
        };

        updateContainerDimensions();

        window.addEventListener('resize', updateContainerDimensions);

        return () => {
            window.removeEventListener('resize', updateContainerDimensions);
        };
    }, [setContainerHeight, setContainerWidth]);

    const filteredImages = positionedImages.filter(img => {
        // +translateY means "in screen coordinates"
        const buffer = 1000;
        const isNearViewport = img.y + translateY > -1 * buffer &&
            img.y + translateY < containerHeight + buffer &&
            img.x + img.width > -translateX &&
            img.x < -translateX + containerWidth;
        return isNearViewport;
    });

    const handleImageClicked = (img: Image) => {
        console.log('Image clicked', img);
        // Reset the central image position and update translation
        img.column = 3;
        img.x = 0;
        img.y = 0;
        img.width = columnWidth * 2 + gutter;
        img.height = 600;
        setTranslateX(-352);
        setTranslateY(199);
        setCentralImage(img);
        const updatedImages = images.filter(image => image.key !== img.key);
        setImages([...updatedImages]);
    };

    return (
        <div className="h-screen w-screen overflow-hidden">
            <div className="fixed w-[330px] top-0 bg-white p-4 shadow-md z-10" id="debug-panel">
                <p className="text-lg font-semibold">
                    Images Loaded: <span className="text-blue-600">{filteredImages.length}/{images.length}</span>
                </p>
                <p>{imagesPreloaded ? "Images Preloaded" : "Images Loading..."}</p>
                <p>
                    columns: <span className="text-green-600">{numColumns}</span>
                </p>
                <p>translateY: <span className="text-green-600">{translateY}</span> minY: <span className="text-green-600">{colUpperBounds && Math.min(...colUpperBounds)}</span></p>
                <p>translateX: <span className="text-green-600">{translateX}</span> maxY: <span className="text-green-600">{colLowerBounds && Math.min(...colLowerBounds)}</span></p>
            </div>
            <div className="grid_container"
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onWheel={handleWheel}
                style={{ touchAction: 'none' }}
            >
                <div className="grid_layer_wrapper">
                    <div className="absolute h-full w-full bg-stone-200"></div>
                    <div className="grid_layer">
                        <div className="grid_content"
                            style={{
                                transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                                transition: 'transform 0.2s ease-out',
                                width: `${numColumns * (columnWidth + gutter)}px`,
                                height: `${maxHeight}px`,
                            }}
                        >
                            {centralImage && (
                                
                                <SingleImage key={centralImage.key} img={centralImage} alt="Central Image" onImageClicked={handleImageClicked} />
                            )}
                            {filteredImages.map((img, index) => (
                                <SingleImage key={img.key} img={img} alt={`Image ${index}`} onImageClicked={handleImageClicked} />
                            ))}
                            <div ref={ref} className="h-10 w-10 absolute bottom-0 right-0" />
                        </div>
                    </div>
                </div>
            </div>
            {loading && <p className="text-center">Loading more images...</p>}
        </div>
    );
};

export default ImageExplorer;
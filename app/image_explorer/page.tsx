"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePreventDefaultScroll } from './hooks/preventScroll';
import SingleImage from './SingleImage';
import { Image } from './types';
import usePan from './hooks/usePanZoom';


const ImageExplorer = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(false);
    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: false,
    });

    // we can pass a function here, but for now, ignore all scroll! (otherwise it scrolls the page)
    usePreventDefaultScroll(e => true)

    const containerRef = useRef<HTMLDivElement>(null);
    const [translateX, translateY, handleWheel, handleMouseDown] = usePan();
    const columnWidth = 300;
    const numColumns = 7;
    const gutter = 25; // Space between images
    const [colUpperBounds, setColUpperBounds] = useState<number[] | null>(null);
    const [colLowerBounds, setColLowerBounds] = useState<number[] | null>(null);
    const [centralImage, setCentralImage] = useState<Image | null>(null);

    useEffect(() => {
        if (!colUpperBounds || !colLowerBounds) return;

        // if we scroll over the top
        const Y_BUFFER = 500;
        const minColumnY = Math.min(...colUpperBounds);
        if (0 - translateY < minColumnY + Y_BUFFER) {
            console.log("over the top!", -translateY, minColumnY);
            fetchImages({ above: true });
        }

        // if we scroll over the bottom
        const maxColumnY = Math.max(...colLowerBounds);
        const viewportHeight = window.innerHeight;
        if (viewportHeight - translateY > maxColumnY - Y_BUFFER) {
            console.log("over the bottom!", -translateY, maxColumnY);
            fetchImages({ above: false });
        }
    }, [translateY, colUpperBounds, colLowerBounds]);

    const fetchImages = useCallback(async ({ above = false } = {}) => {
        if (loading) return;

        setLoading(true);
        // Simulating an API call to fetch images

        let baseline = Array(numColumns).fill(0).map(() => -Math.floor(Math.random() * 301) - 100)
        let newUpperBounds = colUpperBounds || [...baseline];
        let newLowerBounds = colLowerBounds || [...baseline];

        const newImages: Image[] = Array.from({ length: numColumns * 2 }, (_, i) => {
            const column = i % numColumns;
            const height = 400;

            let y;
            if (above) {
                y = newUpperBounds[column];
                newUpperBounds[column] -= height + gutter;
            } else {
                y = newLowerBounds[column];
                newLowerBounds[column] += height + gutter;
            }
            const x = column * (columnWidth + gutter);
            return {
                src: `https://picsum.photos/${columnWidth}/${height}?random=${i}`,
                width: columnWidth,
                key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                height,
                column,
                x,
                y,
            };
        });

        // Use functional updates to avoid dependencies on state
        setColUpperBounds(_ => {
            return newUpperBounds;
        });

        setColLowerBounds(_ => {
            return newLowerBounds
        });

        setImages(prevImages => above ? [...newImages, ...prevImages] : [...prevImages, ...newImages]);
        setLoading(false);
    }, [loading, colUpperBounds, colLowerBounds, numColumns, columnWidth, gutter]);

    // In development mode, this effect might run twice
    // We can use a ref to ensure it only runs once, even in dev mode
    const hasRun = useRef(false);

    useEffect(() => {
        const initialFetch = async () => {
            await fetchImages();
            // Set a central image (for demonstration purposes)
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
    }, []); // Empty dependency array to ensure it only runs once on mount

    useEffect(() => {
        if (inView && !loading) {
            fetchImages();
        }
    }, [inView, loading, fetchImages]);

    // Function to position images in a grid layout
    const positionImages = (images: Image[]) => {
        const containerWidth = containerRef.current?.clientWidth || (typeof window !== 'undefined' && window.innerWidth) || 700;

        const wrapColumns = (img: Image) => {
            const X_BUFFER = 0 * columnWidth;

            let realLeft = img.x + translateX;
            let realRight = img.x + columnWidth + translateX;

            // if we scroll to the LEFT, we reveal more images on the RIGHT, while hiding images on the LEFT
            // check if image col is off screen, and if so, move it to the right
            while (realRight < 0 - X_BUFFER) {
                img.x += (numColumns) * (columnWidth + gutter);
                realRight = img.x + columnWidth + translateX;
            }
            // if we scroll to the RIGHT, we reveal more images on the LEFT, while hiding images on the RIGHT
            // check if image col is off screen, and if so, move it to the left
            while (realLeft > containerWidth + X_BUFFER) {
                img.x -= (numColumns) * (columnWidth + gutter);
                realLeft = img.x + translateX;
            }
        };

        // Position central image
        if (centralImage) {
            centralImage.x = 3 * (columnWidth + gutter);
            centralImage.y = 0;
            wrapColumns(centralImage);
        }

        images.forEach((img, index) => {
            wrapColumns(img);
        });

        // calculate the max column height
        const maxHeight = Math.max(...images.reduce((acc, img) => {
            acc[img.column] = (acc[img.column] || 0) + img.height + gutter;
            return acc;
        }, new Array(numColumns).fill(0)));


        return { positionedImages: images, maxHeight };
    };

    const { positionedImages, maxHeight } = positionImages(images);

    const [containerHeight, setContainerHeight] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

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
    }, []);

    const filteredImages = positionedImages.filter(img => {
        const isInViewport = img.y + img.height > -translateY &&
                             img.y < -translateY + containerHeight &&
                             img.x + img.width > -translateX &&
                             img.x < -translateX + containerWidth;
        return isInViewport;
    });

    return (
        <div className="h-screen w-screen overflow-hidden">
            <div className="fixed w-[330px] top-0 bg-white p-4 shadow-md z-10" id="debug-panel">
                <p className="text-lg font-semibold">
                    Images Loaded: <span className="text-blue-600">{filteredImages.length}/{images.length}</span>
                </p>
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
                                transition: 'transform 0.1s ease-out',
                                width: `${numColumns * (columnWidth + gutter)}px`,
                                height: `${maxHeight}px`,
                            }}
                        >
                            {centralImage && (
                                <SingleImage key={centralImage.key} img={centralImage} alt="Central Image" />
                            )}
                            {filteredImages.map((img, index) => (
                                <SingleImage key={img.key} img={img} alt={`Image ${index}`} />
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
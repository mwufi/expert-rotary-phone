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
    const [imagesInViewport, setImagesInViewport] = useState(0);
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
    const [colY, setcolY] = useState<number[]>(Array(numColumns).fill(0).map(() => -Math.floor(Math.random() * 301) - 100));
    const [centralImage, setCentralImage] = useState<Image | null>(null);

    useEffect(() => {
        // if we scroll over the top
        const Y_BUFFER = 500;
        const minColumnY = Math.min(...colY);
        if (-translateY < minColumnY + Y_BUFFER) {
            console.log("over the top!", -translateY, minColumnY);
            fetchImages({ above: true });
        }
    }, [translateY]);

    const fetchImages = useCallback(async ({ above } = { above: false }) => {
        if (loading) return;
        setLoading(true);
        // Simulating an API call to fetch images
        const newImages: Image[] = Array.from({ length: numColumns * 2 }, (_, i) => ({
            src: `https://picsum.photos/${columnWidth}/${300 + Math.floor(Math.random() * 100)}?random=${Date.now() + i}`,
            width: columnWidth,
            key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            height: 300 + Math.floor(Math.random() * 100),
            column: i % numColumns,
        }));
        if (above) {
            // compute new colY (the start y position of the column) by copying from it and subtracting image heights and gutter
            const newColY = [...colY];
            for (const img of newImages) {
                newColY[img.column] -= img.height + gutter;
            }

            setcolY(newColY);
            setImages(prevImages => [...newImages, ...prevImages]);
        } else {
            setImages(prevImages => [...prevImages, ...newImages]);
        }
        setLoading(false);

        // the important part is to include colY in the dependency array!!
        // otherwise fetchImages will always have a cached value of colY
        // (the initial value)
    }, [loading, colY]);

    useEffect(() => {
        fetchImages();
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
    }, [fetchImages]);

    useEffect(() => {
        if (inView && !loading) {
            fetchImages();
        }
    }, [inView, loading, fetchImages]);

    useEffect(() => {
        const updateImagesInViewport = () => {
            const imageElements = document.querySelectorAll('.grid_item');
            let count = 0;
            imageElements.forEach(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight &&
                    rect.left >= 0 && rect.right <= window.innerWidth) {
                    count++;
                }
            });
            setImagesInViewport(count);
        };

        updateImagesInViewport();
        window.addEventListener('scroll', updateImagesInViewport);
        return () => window.removeEventListener('scroll', updateImagesInViewport);
    }, [images, translateX, translateY]);


    // Function to position images in a grid layout
    const positionImages = (images: Image[]) => {
        let columns: number[] = [...colY];
        let maxHeight = 0;
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
            columns[3] = centralImage.height + gutter;
            columns[4] = centralImage.height + gutter;
            wrapColumns(centralImage);
            maxHeight = Math.max(maxHeight, centralImage.height + gutter);
        }

        // Layout for column 3 & 4
        const bottomOfBigImage = centralImage?.height + gutter;
        const topOfBigImage = centralImage?.y - gutter;
        let col3 = { a: bottomOfBigImage, b: bottomOfBigImage };
        let col4 = { a: topOfBigImage, b: topOfBigImage };
        const ax = 3 * (columnWidth + gutter);
        const bx = ax + columnWidth + gutter;

        images.forEach((img, index) => {
            let columnIndex = img.column;

            if (columnIndex === 3 && centralImage) {
                if (index % 2 === 0) {
                    img.x = ax;
                    img.y = col3.a;
                    col3.a += img.height + gutter;
                } else {
                    img.x = bx;
                    img.y = col3.b;
                    col3.b += img.height + gutter;
                }
                columns[3] = Math.max(col3.a, col3.b);
            } else if (columnIndex === 4 && centralImage) {
                // Layout for column 4
                const imageTop = (i: Image, bottom: number) => bottom - i.height;

                if (index % 2 === 0) {
                    img.x = ax;
                    img.y = imageTop(img, col4.a);
                    col4.a -= img.height + gutter;
                } else {
                    img.x = bx;
                    img.y = imageTop(img, col4.b);
                    col4.b -= img.height + gutter;
                }
                columns[4] = Math.min(col4.a, col4.b);
            } else {
                // Standard layout for other columns
                img.x = columnIndex * (columnWidth + gutter);
                img.y = columns[columnIndex];
                columns[columnIndex] += img.height + gutter;
            }

            wrapColumns(img);

            maxHeight = Math.max(maxHeight, columns[columnIndex]);
        });

        return { positionedImages: images, maxHeight };
    };

    const { positionedImages, maxHeight } = positionImages(images);


    return (
        <div className="h-screen w-screen overflow-hidden">
            <div className="fixed w-[330px] top-0 bg-white p-4 shadow-md z-10" id="debug-panel">
                <p className="text-lg font-semibold">
                    Images Loaded: <span className="text-blue-600">{images.length}</span>
                </p>
                <p>
                    columns: <span className="text-green-600">{numColumns}</span>
                </p>
                <p className="text-lg font-semibold">
                    Images in Viewport: <span className="text-green-600">{imagesInViewport}</span>
                </p>
                <p>translateY: <span className="text-green-600">{translateY}</span> minY: <span className="text-green-600">{Math.min(...colY)}</span></p>
                <p>translateX: <span className="text-green-600">{translateX}</span> minY: <span className="text-green-600">{Math.min(...colY)}</span></p>
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
                            {positionedImages.map((img, index) => (
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
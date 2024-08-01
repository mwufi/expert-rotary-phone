"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

interface Image {
    src: string;
    width: number;
    height: number;
    column: number;
    key: string;
    x?: number;
    y?: number;
}

const ImageExplorer = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [imagesInViewport, setImagesInViewport] = useState(0);
    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: false,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const columnWidth = 300; // Width of each column
    const gutter = 10; // Space between images
    const numColumns = 7; // Initial number of columns
    const [colY, setcolY] = useState<number[]>(Array(numColumns).fill(0).map(() => -Math.floor(Math.random() * 301) - 100));

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
        setPage(prevPage => prevPage + 1);
        setLoading(false);

        // the important part is to include colY in the dependency array!!
        // otherwise fetchImages will always have a cached value of colY
        // (the initial value)
    }, [loading, colY]);

    useEffect(() => {
        fetchImages();
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

    const handleWheel = (e: React.WheelEvent) => {
        const newTranslateX = translateX - e.deltaX;
        const newTranslateY = translateY - e.deltaY;
        setTranslateX(newTranslateX);
        setTranslateY(newTranslateY);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        const startX = e.clientX - translateX;
        const startY = e.clientY - translateY;

        const handleMouseMove = (e: MouseEvent) => {
            const newTranslateX = e.clientX - startX;
            const newTranslateY = e.clientY - startY;
            setTranslateX(newTranslateX);
            setTranslateY(newTranslateY);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Function to position images in a grid layout
    const positionImages = (images: Image[]) => {
        let columns: number[] = [...colY];
        let maxHeight = 0;
        const containerWidth = containerRef.current?.clientWidth || (typeof window !== 'undefined' && window.innerWidth) || 700;
        images.forEach((img, index) => {
            let columnIndex = img.column;

            img.x = columnIndex * (columnWidth + gutter);
            img.y = columns[columnIndex];

            // Check if the image is on screen using translateX
            // wait this long before moving the image to the right
            const X_BUFFER = columnWidth * 2;

            while (img.x + translateX < 0 - X_BUFFER) {
                img.x += (numColumns) * (columnWidth + gutter);
            }
            while (img.x + translateX + columnWidth > containerWidth + X_BUFFER) {
                img.x -= (numColumns) * (columnWidth + gutter);
            }

            columns[columnIndex] += img.height + gutter;
            maxHeight = Math.max(maxHeight, columns[columnIndex]);
        });

        return { positionedImages: images, maxHeight };
    };

    const { positionedImages, maxHeight } = positionImages(images);

    useEffect(() => {
        const preventDefaultScroll = (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', preventDefaultScroll, { passive: false });
        return () => window.removeEventListener('wheel', preventDefaultScroll);
    }, []);

    return (
        <div className="h-screen w-screen overflow-hidden">
            <div className="sticky top-0 bg-white p-4 shadow-md z-10 hidden">
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
            </div>
            <div className="grid_container"
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onWheel={handleWheel}
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
                            {positionedImages.map((img, index) => (
                                <div
                                    key={img.key}
                                    className="grid_item"
                                    style={{
                                        position: 'absolute',
                                        width: `${img.width}px`,
                                        height: `${img.height}px`,
                                        left: `${img.x}px`,
                                        top: `${img.y}px`,
                                        overflow: 'hidden',
                                        borderRadius: '0.75rem', // equivalent to rounded-xl
                                        margin: '0.25rem', // equivalent to m-1
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // equivalent to shadow-md
                                        transition: 'box-shadow 0.3s ease-in-out',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'} // equivalent to hover:shadow-lg
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}
                                >
                                    <img
                                        src={img.src}
                                        alt={`Image ${index}`}
                                        className="grid_item_img"
                                        style={{ 
                                            width: '110%', 
                                            height: '110%', 
                                            objectFit: 'cover',
                                            transition: 'all 0.3s ease-in-out',
                                            transform: 'scale(1.1)',
                                            margin: '-5%',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.margin = '0';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.1)';
                                            e.currentTarget.style.margin = '-5%';
                                        }}
                                        draggable={false}
                                    />
                                </div>
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
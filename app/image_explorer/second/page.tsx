'use client'

import React, { useCallback } from 'react';

import { useState, useEffect } from 'react';
import { Image } from '../types';
import SingleImage from '../SingleImage';
import { getImages } from '../api.server';
import PhysicsPanWindow, { usePanZoom } from './PhysicsPanWindow';


const useFixedLayout = () => {
    useEffect(() => {
        // Apply styles to html element
        document.documentElement.style.position = 'fixed';
        document.documentElement.style.height = '100%';
        document.documentElement.style.overflow = 'hidden';

        // Apply styles to body element (assuming it's the equivalent of #__next)
        document.body.style.position = 'absolute';
        document.body.style.overflowY = 'auto';

        // Cleanup function to remove styles when component unmounts
        return () => {
            document.documentElement.style.removeProperty('position');
            document.documentElement.style.removeProperty('height');
            document.documentElement.style.removeProperty('overflow');

            document.body.style.removeProperty('position');
            document.body.style.removeProperty('top');
            document.body.style.removeProperty('left');
            document.body.style.removeProperty('right');
            document.body.style.removeProperty('bottom');
            document.body.style.removeProperty('overflow-y');
            document.body.style.removeProperty('-webkit-overflow-scrolling');
        };
    }, []);
};


const PosDisplay = () => {
    const { currentPos } = usePanZoom();

    const viewport = {
        x: -currentPos.x,
        y: -currentPos.y,
        width: window.innerWidth,
        height: window.innerHeight
    }

    return (
        <div className="fixed top-0 left-0 p-4 m-4 z-10 rounded-xl bg-white/70">
            <p>Viewport: {viewport.x}, {viewport.y} -- {viewport.width}, {viewport.height}</p>
        </div>
    );
};
// Custom hook for image positions
const useImgPositions = (images: Image[], currentPos: { x: number, y: number }, columnWidth: number, wrapLeft: boolean, wrapRight: boolean, wrapTop: boolean, wrapBottom: boolean) => {
    const [imgPositions, setImgPositions] = useState([]);

    useEffect(() => {
        const calculateImgPositions = () => {
            const columns = 8;
            const gapSize = 16; // 4rem gap
            const totalWidth = columns * columnWidth + (columns - 1) * gapSize;
            const totalHeight = images.length / columns * images[0]?.height + (images.length / columns - 1) * gapSize;


            const viewport = {
                x: -currentPos.x,
                y: -currentPos.y,
                width: window.innerWidth,
                height: window.innerHeight
            }

            const colBottom = Array(columns).fill(0);

            const positions = images.map((img, index) => {
                const column = index % columns;
                let x = column * (columnWidth + gapSize);
                let y = colBottom[column];

                // Update the column's bottom position
                colBottom[column] += img.height + gapSize;

                // Wrap to the right if it's too far left and wrapping left is allowed
                while (wrapLeft && x + columnWidth < viewport.x) {
                    x += totalWidth + gapSize;
                }
                // Wrap to the left if it's too far right and wrapping right is allowed
                while (wrapRight && x > viewport.x + viewport.width) {
                    x -= totalWidth + gapSize;
                }

                while (wrapTop && y + img.height < viewport.y) {
                    y += totalHeight + gapSize;
                }
                while (wrapBottom && y > viewport.y + viewport.height) {
                    y -= totalHeight + gapSize;
                }

                return {
                    x,
                    y
                };
            })

            return positions;
        };

        const newPositions = calculateImgPositions();
        if (JSON.stringify(newPositions) !== JSON.stringify(imgPositions)) {
            setImgPositions(newPositions);
        }
    }, [images, currentPos, columnWidth, imgPositions]);

    return imgPositions;
};

const ImageGrid = () => {
    // prevent overflow on mobile
    useFixedLayout();

    const { currentPos } = usePanZoom();
    const [images, setImages] = useState<Image[]>([]);
    const columnWidth = 300;

    useEffect(() => {
        const fetchImages = async () => {
            const newImages = await getImages(40, { width: columnWidth });
            setImages(newImages);
        };
        fetchImages();
    }, []);

    const handleImageClick = useCallback((clickedImg: Image) => {
        console.log('Image clicked:', clickedImg);

        setImages(prevImages => prevImages.map(img => {
            if (img.key === clickedImg.key && !img.selected) {
                return { ...img, width: img.width * 2, height: img.height * 2, selected: true };
            } else {
                return { ...img, width: columnWidth, height: img.height * (columnWidth / img.width), selected: false };
            }
        }));
    }, [columnWidth]);

    // Use the new custom hook for image positions
    const imgPositions = useImgPositions(images, currentPos, columnWidth, true, true, true, true);

    // Memoize the grid content to prevent unnecessary re-renders
    const memoizedGridContent = React.useMemo(() => {
        return (
            (
                <>
                    {images.map((img, index) => (
                        <div
                            style={{
                                position: 'absolute',
                                left: imgPositions[index]?.x || 0,
                                top: imgPositions[index]?.y || 0,
                                width: img.width,
                                height: img.height,
                                transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out'
                            }}
                            onMouseDown={(e) => {
                                const startX = e.clientX;
                                const startY = e.clientY;
                                const handleMouseUp = (e: MouseEvent) => {
                                    const endX = e.clientX;
                                    const endY = e.clientY;
                                    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                                    if (distance < 5) {
                                        handleImageClick(img);
                                    }
                                    document.removeEventListener('mouseup', handleMouseUp);
                                };
                                document.addEventListener('mouseup', handleMouseUp);
                            }}
                        >
                            <SingleImage
                                key={img.key}
                                img={img}
                                alt={`Image ${img.key}`}
                            />
                        </div>
                    ))}
                </>
            )
        )
    }, [images, imgPositions, handleImageClick]);

    return (
        <div className="bg-zinc-400">
            <div>{currentPos.x}</div>
            {memoizedGridContent}
        </div>
    );
};

const SecondPage = () => {
    return (
        <div className="h-screen overflow-hidden">
            <PosDisplay />
            <PhysicsPanWindow>
                <ImageGrid />
            </PhysicsPanWindow>
        </div>
    );
};

export default SecondPage;

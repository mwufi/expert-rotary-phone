'use client'

import React, { useCallback } from 'react';
import InertialPanZoomWindow, { usePanZoom } from './InertialPanZoomWindow';

import { useState, useEffect } from 'react';
import { Image } from '../types';
import SingleImage from '../SingleImage';
import { getImages } from '../api.server';


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
const useImgPositions = (images: Image[], currentPos: { x: number, y: number }, columnWidth: number, wrapLeft: boolean, wrapRight: boolean) => {
    const [imgPositions, setImgPositions] = useState([]);

    useEffect(() => {
        const calculateImgPositions = () => {
            const columns = 8;
            const gapSize = 16; // 4rem gap
            const totalWidth = columns * columnWidth + (columns - 1) * gapSize;

            const viewport = {
                x: -currentPos.x,
                y: -currentPos.y,
                width: window.innerWidth,
                height: window.innerHeight
            }

            const positions = images.map((img, index) => {
                const column = index % columns;
                const row = Math.floor(index / columns);
                let x = column * (columnWidth + gapSize);
                let y = row * (img.height + gapSize);

                // Wrap to the right if it's too far left and wrapping left is allowed
                while (wrapLeft && x + columnWidth < viewport.x) {
                    x += totalWidth + gapSize;
                }
                // Wrap to the left if it's too far right and wrapping right is allowed
                while (wrapRight && x > viewport.x + viewport.width) {
                    x -= totalWidth + gapSize;
                }

                return {
                    x,
                    y
                };
            });

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

    const handleImageClick = useCallback((img: Image) => {
        console.log('Image clicked:', img);
        // Add any additional logic for image click
    }, []);

    // Use the new custom hook for image positions
    const imgPositions = useImgPositions(images, currentPos, columnWidth, true, true);

    // Memoize the grid content to prevent unnecessary re-renders
    const memoizedGridContent = React.useMemo(() => {
        return (
            (
                <>
                    {images.map((img, index) => (
                        <div style={{
                            position: 'absolute',
                            left: imgPositions[index]?.x || 0,
                            top: imgPositions[index]?.y || 0,
                            width: img.width,
                            height: img.height
                        }}>
                            <SingleImage
                                key={img.key}
                                img={img}
                                alt={`Image ${img.key}`}
                                onImageClicked={handleImageClick}

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
            <div className="mt-4"></div>
            <InertialPanZoomWindow>
                <ImageGrid />
            </InertialPanZoomWindow>
        </div>
    );
};

export default SecondPage;

'use client'

import React, { useCallback } from 'react';
import InertialPanZoomWindow, { usePanZoom } from './InertialPanZoomWindow';

import { useState, useEffect } from 'react';
import { Image } from '../types';
import SingleImage from '../SingleImage';
import { getImages } from '../api.server';


const PosDisplay = () => {
    const { currentPos } = usePanZoom();
    return (
        <div className="fixed top-0 left-0 p-4 m-4 z-10 rounded-xl bg-white/70">
            {currentPos.x}, {currentPos.y}
        </div>
    );
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

    // Memoize the grid content to prevent unnecessary re-renders
    const memoizedGridContent = React.useMemo(() => (
        <>
            {images.map((img) => (
                <SingleImage
                    key={img.key}
                    img={img}
                    alt={`Image ${img.key}`}
                    onImageClicked={handleImageClick}
                />
            ))}
        </>
    ), [images, handleImageClick]);

    return (
        <div className="grid grid-cols-6 gap-4 bg-zinc-400">
            <div>{currentPos.x}</div>
            {memoizedGridContent}
        </div>
    );
};


const SecondPage = () => {
    return (
        <div>
            <PosDisplay />
            <div className="mt-4"></div>
            <InertialPanZoomWindow>
                <ImageGrid />
            </InertialPanZoomWindow>
        </div>
    );
};

export default SecondPage;

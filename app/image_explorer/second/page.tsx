'use client'

import React from 'react';
import InertialPanZoomWindow, { usePanZoom } from './InertialPanZoomWindow';

import { useState, useEffect } from 'react';
import { Image } from '../types';
import SingleImage from '../SingleImage';
import { getImages } from '../api.server';


const PosDisplay = () => {
    const { currentPos } = usePanZoom();
    return (
        <div>
            {currentPos.x}, {currentPos.y}
        </div>
    );
};

const ImageGrid = () => {
    const [images, setImages] = useState<Image[]>([]);
    const columnWidth = 300;

    useEffect(() => {
        const fetchImages = async () => {
            const newImages = await getImages(40, { width: columnWidth });
            setImages(newImages);
        };
        fetchImages();
    }, []);

    const handleImageClick = (img: Image) => {
        console.log('Image clicked:', img);
        // Add any additional logic for image click
    };

    return (
        <div className="grid grid-cols-6 gap-4 bg-zinc-400">
            {/* <div>
                {currentPos.x}, {currentPos.y}
            </div> */}
            {images.map((img) => (
                <SingleImage
                    key={img.key}
                    img={img}
                    alt={`Image ${img.key}`}
                    onImageClicked={handleImageClick}
                />
            ))}
        </div>

    );
};


const SecondPage = () => {
    return (
        <InertialPanZoomWindow>
            <PosDisplay />
            <ImageGrid />
        </InertialPanZoomWindow>
    );
};

export default SecondPage;

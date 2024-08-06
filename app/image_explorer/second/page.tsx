'use client'

import React from 'react';
import PanZoomWindow from './PanZoomWindow';


import { useState, useEffect } from 'react';
import { Image } from '../types';
import SingleImage from '../SingleImage';
import { getImages } from '../api.server';

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
        <div className="grid grid-cols-7 gap-4">

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
        <PanZoomWindow>
            <div className="flex items-center justify-center h-full w-full">
                <ImageGrid />
            </div>
        </PanZoomWindow>
    );
};

export default SecondPage;

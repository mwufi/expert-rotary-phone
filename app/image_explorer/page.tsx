"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

const ImageExplorer = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [imagesInViewport, setImagesInViewport] = useState(0);
    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: false,
    });

    const fetchImages = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        // Simulating an API call to fetch images
        const newImages = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/200/200?random=${Date.now() + i}`);
        setImages(prevImages => [...prevImages, ...newImages]);
        setPage(prevPage => prevPage + 1);
        setLoading(false);
    }, [loading]);

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
            const imageElements = document.querySelectorAll('.image-item');
            let count = 0;
            imageElements.forEach(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    count++;
                }
            });
            setImagesInViewport(count);
        };

        window.addEventListener('scroll', updateImagesInViewport);
        updateImagesInViewport(); // Initial count

        return () => window.removeEventListener('scroll', updateImagesInViewport);
    }, [images]);

    return (
        <div className="overflow-auto h-screen">
            <div className="sticky top-0 bg-white p-4 shadow-md z-10">
                <p className="text-lg font-semibold">
                    Images Loaded: <span className="text-blue-600">{images.length}</span>
                </p>
                <p className="text-lg font-semibold">
                    Images in Viewport: <span className="text-green-600">{imagesInViewport}</span>
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {images.map((src, index) => (
                    <div key={index} className="aspect-square overflow-hidden image-item">
                        <img src={src} alt={`Image ${index}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <div ref={ref} className="h-10" />
            {loading && <p className="text-center">Loading more images...</p>}
        </div>
    );
};

export default ImageExplorer;

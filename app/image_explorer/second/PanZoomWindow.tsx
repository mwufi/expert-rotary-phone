'use client'

import React, { useState, useRef, useEffect } from 'react';
import { usePreventDefaultScroll } from '../hooks/preventScroll';

const PanZoomWindow = ({ children }: { children: React.ReactNode }) => {
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX - translateX);
        setStartY(e.clientY - translateY);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const newTranslateX = e.clientX - startX;
        const newTranslateY = e.clientY - startY;
        setTranslateX(newTranslateX);
        setTranslateY(newTranslateY);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    usePreventDefaultScroll(e => true);

    const handleWheel = (e: React.WheelEvent) => {
        setTranslateX(prevX => prevX - e.deltaX);
        setTranslateY(prevY => prevY - e.deltaY);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startX, startY]);

    return (
        <div
            ref={containerRef}
            className="h-screen w-screen overflow-hidden cursor-move"
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
        >
            <div
                className="h-full w-full bg-gray-100"
                style={{
                    transform: `translate(${translateX}px, ${translateY}px)`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default PanZoomWindow;
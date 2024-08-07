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

    const handleStart = (clientX: number, clientY: number) => {
        setIsDragging(true);
        setStartX(clientX - translateX);
        setStartY(clientY - translateY);
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!isDragging) return;
        const newTranslateX = clientX - startX;
        const newTranslateY = clientY - startY;
        setTranslateX(newTranslateX);
        setTranslateY(newTranslateY);
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleMouseUp = handleEnd;

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const handleTouchEnd = handleEnd;

    usePreventDefaultScroll(e => true);

    const handleWheel = (e: React.WheelEvent) => {
        setTranslateX(prevX => prevX - e.deltaX);
        setTranslateY(prevY => prevY - e.deltaY);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, startX, startY]);

    return (
        <div
            ref={containerRef}
            className="h-screen w-screen overflow-hidden"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onWheel={handleWheel}
        >
            <div
                className="h-full w-full bg-gray-100"
                style={{
                    transform: `translate(${translateX}px, ${translateY}px)`,
                    transition: isDragging ? 'none' : 'transform 0.4s ease-out',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default PanZoomWindow;
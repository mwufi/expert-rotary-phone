'use client'

import React, { useState, useRef, useEffect } from 'react';
import { usePreventDefaultScroll } from '../hooks/preventScroll';

export function usePanZoom() {
    return {
        currentPos: { x: 0, y: 0 }
    }
}

const PanZoomWindow = ({ children }: { children: React.ReactNode }) => {
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollXRef = useRef(0);
    const scrollYRef = useRef(0);
    const targetXRef = useRef(0);
    const targetYRef = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX - translateX);
        setStartY(e.clientY - translateY);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const newTranslateX = e.clientX - startX;
        const newTranslateY = e.clientY - startY;
        targetXRef.current = newTranslateX;
        targetYRef.current = newTranslateY;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    usePreventDefaultScroll(e => true);

    const handleWheel = (e: React.WheelEvent) => {
        targetXRef.current -= e.deltaX;
        targetYRef.current -= e.deltaY;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startX, startY]);

    useEffect(() => {
        const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

        const render = () => {
            scrollXRef.current = lerp(scrollXRef.current, targetXRef.current, 0.05);
            scrollYRef.current = lerp(scrollYRef.current, targetYRef.current, 0.05);

            scrollXRef.current = Math.floor(scrollXRef.current * 100) / 100;
            scrollYRef.current = Math.floor(scrollYRef.current * 100) / 100;

            setTranslateX(scrollXRef.current);
            setTranslateY(scrollYRef.current);

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }, []);

    return (
        <div
            ref={containerRef}
            className=""
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
        >
            <div
                className=""
                style={{
                    transform: `translate(${translateX}px, ${translateY}px)`,
                    transition: isDragging ? 'none' : 'transform 0.05s linear',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default PanZoomWindow;
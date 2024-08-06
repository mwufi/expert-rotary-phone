'use client'

import React, { useState, useRef, useEffect } from 'react';
import { usePreventDefaultScroll } from '../hooks/preventScroll';
import { create } from 'zustand';

interface PanZoomState {
    translateX: number;
    translateY: number;
    setTranslateX: (x: number) => void;
    setTranslateY: (y: number) => void;
}

const usePanZoomStore = create<PanZoomState>((set) => ({
    translateX: 0,
    translateY: 0,
    setTranslateX: (x) => set({ translateX: x }),
    setTranslateY: (y) => set({ translateY: y }),
}));

export function usePanZoom() {
    const { translateX, translateY } = usePanZoomStore();
    return {
        currentPos: { x: translateX, y: translateY }
    }
}

const PanZoomWindow = ({ children }: { children: React.ReactNode }) => {
    const { translateX, translateY, setTranslateX, setTranslateY } = usePanZoomStore();
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollXRef = useRef(0);
    const scrollYRef = useRef(0);
    const targetXRef = useRef(0);
    const targetYRef = useRef(0);
    const velocityXRef = useRef(0);
    const velocityYRef = useRef(0);
    const lastTimeRef = useRef(0);
    const isMobileRef = useRef(false);

    const handleStart = (clientX: number, clientY: number) => {
        setIsDragging(true);
        setStartX(clientX - translateX);
        setStartY(clientY - translateY);
        velocityXRef.current = 0;
        velocityYRef.current = 0;
        lastTimeRef.current = Date.now();
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!isDragging) return;
        const currentTime = Date.now();
        const timeElapsed = currentTime - lastTimeRef.current;
        const newTranslateX = clientX - startX;
        const newTranslateY = clientY - startY;
        const multiplier = 15;
        if (timeElapsed > 0) {
            velocityXRef.current = (newTranslateX - targetXRef.current) / timeElapsed * multiplier;
            velocityYRef.current = (newTranslateY - targetYRef.current) / timeElapsed * multiplier;
        }

        targetXRef.current = newTranslateX;
        targetYRef.current = newTranslateY;
        lastTimeRef.current = currentTime;
    };

    const handleEnd = () => {
        setIsDragging(false);
        if (isMobileRef.current) {
            const animate = () => {
                // Cap the max velocity to 15
                velocityXRef.current = Math.min(Math.max(velocityXRef.current, -15), 15);
                velocityYRef.current = Math.min(Math.max(velocityYRef.current, -15), 15);
                if(velocityXRef.current > 0) {
                    velocityXRef.current -= 0.05;
                } else {
                    velocityXRef.current += 0.05;
                }
                if(velocityYRef.current > 0) {
                    velocityYRef.current -= 0.05;
                } else {
                    velocityYRef.current += 0.05;
                }
                targetXRef.current += velocityXRef.current;
                targetYRef.current += velocityYRef.current;

                if (Math.abs(velocityXRef.current) > 0.05 || Math.abs(velocityYRef.current) > 0.05) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleMouseUp = handleEnd;

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            isMobileRef.current = true;
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
        targetXRef.current -= e.deltaX;
        targetYRef.current -= e.deltaY;
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

    useEffect(() => {
        const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

        const render = () => {
            const lerpFactor = isMobileRef.current ? 0.15 : 0.05; // Faster lerp for mobile
            scrollXRef.current = lerp(scrollXRef.current, targetXRef.current, lerpFactor);
            scrollYRef.current = lerp(scrollYRef.current, targetYRef.current, lerpFactor);

            scrollXRef.current = Math.floor(scrollXRef.current * 100) / 100;
            scrollYRef.current = Math.floor(scrollYRef.current * 100) / 100;

            setTranslateX(scrollXRef.current);
            setTranslateY(scrollYRef.current);

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }, [setTranslateX, setTranslateY]);

    return (
        <div
            ref={containerRef}
            className="bg-blue-100 h-screen w-screen overflow-hidden"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
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
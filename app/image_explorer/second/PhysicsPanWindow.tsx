import React, { useState, useRef, useEffect } from 'react';
import { create } from 'zustand';

interface PanZoomState {
    position: { x: number, y: number };
    velocity: { x: number, y: number };
    setPosition: (pos: { x: number, y: number }) => void;
    setVelocity: (vel: { x: number, y: number }) => void;
}

const usePanZoomStore = create<PanZoomState>((set) => ({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    setPosition: (pos) => set({ position: pos }),
    setVelocity: (vel) => set({ velocity: vel }),
}));

export function usePanZoom() {
    const { position } = usePanZoomStore();
    return {
        currentPos: position
    }
}
const PanZoomWindow = ({ children }: { children: React.ReactNode }) => {
    const { position, velocity, setPosition, setVelocity } = usePanZoomStore();
    const [isDragging, setIsDragging] = useState(false);
    const lastTimeRef = useRef(Date.now());
    const lastPositionRef = useRef({ x: 0, y: 0 });
    const dragStartPosRef = useRef({ x: 0, y: 0 });

    const handleStart = (clientX: number, clientY: number) => {
        setIsDragging(true);
        dragStartPosRef.current = { x: clientX - position.x, y: clientY - position.y };
        lastPositionRef.current = { ...position };
        lastTimeRef.current = Date.now();
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!isDragging) return;
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTimeRef.current) / 1000; // Convert to seconds
        const newPosition = {
            x: clientX - dragStartPosRef.current.x,
            y: clientY - dragStartPosRef.current.y
        };
        const newVelocity = {
            x: (newPosition.x - lastPositionRef.current.x) / deltaTime,
            y: (newPosition.y - lastPositionRef.current.y) / deltaTime
        };
        setPosition(newPosition);
        setVelocity(newVelocity);
        lastPositionRef.current = newPosition;
        lastTimeRef.current = currentTime;
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    const handleTap = (clientX: number, clientY: number) => {
        const tapImpulse = 200; // Adjust this value to change the "strength" of the tap
        const tapRadius = 50; // Adjust this to change how close to the current position a tap needs to be to affect motion

        const dx = clientX - position.x;
        const dy = clientY - position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < tapRadius) {
            const angle = Math.atan2(dy, dx);
            const tapVelocity = {
                x: Math.cos(angle) * tapImpulse,
                y: Math.sin(angle) * tapImpulse
            };

            // Blend the tap velocity with the existing velocity
            setVelocity({
                x: (velocity.x + tapVelocity.x) * 0.5,
                y: (velocity.y + tapVelocity.y) * 0.5
            });
        }
    };

    useEffect(() => {
        let animationFrameId: number;

        const updatePosition = () => {
            if (!isDragging) {
                const friction = 0.96;
                const newVelocity = {
                    x: velocity.x * friction,
                    y: velocity.y * friction
                };
                const newPosition = {
                    x: position.x + newVelocity.x * 0.016, // Assuming 60 FPS
                    y: position.y + newVelocity.y * 0.016
                };
                setPosition(newPosition);
                setVelocity(newVelocity);
            }

            // Check if velocity is too small to continue updating
            const velocityThreshold = 0.1; // Adjust this value as needed
            if (Math.abs(velocity.x) < velocityThreshold && Math.abs(velocity.y) < velocityThreshold) {
                setVelocity({ x: 0, y: 0 });
                return; // Exit the animation loop
            }
            animationFrameId = requestAnimationFrame(updatePosition);
        };

        animationFrameId = requestAnimationFrame(updatePosition);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDragging, position, velocity, setPosition, setVelocity]);

    return (
        <div
            className="bg-blue-100 h-screen w-screen overflow-hidden"
            onMouseDown={(e) => {
                handleStart(e.clientX, e.clientY);
            }}
            onMouseMove={(e) => {
                handleMove(e.clientX, e.clientY);
            }}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => {
                handleStart(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchEnd={handleEnd}
            onClick={(e) => {
                handleTap(e.clientX, e.clientY);
            }}
        >
            <div
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default PanZoomWindow;
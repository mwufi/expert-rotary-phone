import { useState, useCallback, useRef } from 'react';

type PanHandlers = [
    (e: React.WheelEvent) => void,
    (e: React.MouseEvent) => void
];

function usePan(): [number, number, ...PanHandlers] {
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const rafRef = useRef<number | null>(null);

    const updateState = useCallback((x: number, y: number) => {
        if (rafRef.current === null) {
            rafRef.current = requestAnimationFrame(() => {
                setTranslateX(x);
                setTranslateY(y);
                rafRef.current = null;
            });
        }
    }, []);

    const handleWheel = useCallback((e: React.WheelEvent) => {
        updateState(translateX - e.deltaX, translateY - e.deltaY);
    }, [translateX, translateY, updateState]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX - translateX;
        const startY = e.clientY - translateY;

        const handleMouseMove = (e: MouseEvent) => {
            updateState(e.clientX - startX, e.clientY - startY);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [translateX, translateY, updateState]);

    return [translateX, translateY, handleWheel, handleMouseDown];
}

export default usePan;
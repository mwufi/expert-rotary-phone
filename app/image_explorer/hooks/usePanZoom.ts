import { useCallback } from 'react';
import { useImageExplorerStore } from '../store';

type PanHandlers = [
    (e: React.WheelEvent) => void,
    (e: React.MouseEvent) => void
];

export function usePan(): [...PanHandlers] {
    const {
        translateX,
        translateY,
        setTranslateX,
        setTranslateY
    } = useImageExplorerStore();

    const updateState = useCallback((x: number, y: number) => {
        setTranslateX(x);
        setTranslateY(y);
    }, [setTranslateX, setTranslateY]);

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

    return [handleWheel, handleMouseDown];
}
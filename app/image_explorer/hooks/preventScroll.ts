import { useEffect } from "react";

export const usePreventDefaultScroll = (condition: (e: WheelEvent) => boolean) => {
    useEffect(() => {
        const preventDefaultScroll = (e: WheelEvent) => {
            if (condition(e)) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', preventDefaultScroll, { passive: false });
        return () => window.removeEventListener('wheel', preventDefaultScroll);
    }, [condition]);
};
'use client';

import { useEffect, useState } from 'react';

export const useScreenWidth = (): number => {
    const [screenWidth, setScreenWidth] = useState<number>(0);

    const debounce = (func: () => void) => {
        let timer: number | undefined;
        return (event: UIEvent) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, 150, event);
        };
    };

    useEffect(() => {
        const resizeWindow = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', debounce(resizeWindow));
        resizeWindow();
        return () => window.removeEventListener('resize', debounce(resizeWindow));
    }, []);

    return screenWidth;
};

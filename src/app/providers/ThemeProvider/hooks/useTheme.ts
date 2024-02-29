import { useContext, useEffect } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

type UseThemeResult = {
    toggleTheme: () => void;
    theme: Theme;
};

export const useTheme = (): UseThemeResult => {
    const { setTheme, theme } = useContext(ThemeContext);
    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        if (setTheme) {
            setTheme(newTheme);
        }
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return <UseThemeResult>{
        theme,
        toggleTheme,
    };
};

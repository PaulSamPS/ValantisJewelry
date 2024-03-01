import clsx from 'clsx';
import React from 'react';
import { ThemeLightIcon, ThemeDarkIcon } from '@/shared/assets/icons';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import styles from './ThemeSwitcher.module.scss';
import { Button } from '@/shared/ui/Button';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            size='m'
            appearance='clear'
            className={clsx(styles['theme-switcher'], className)}
            onClick={toggleTheme}
            aria-label='Сменить тему'
        >
            {theme === Theme.DARK ? <ThemeDarkIcon /> : <ThemeLightIcon />}
        </Button>
    );
};

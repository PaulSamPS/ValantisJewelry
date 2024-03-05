import React, { useEffect, useState } from 'react';
import { useScrollY } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import styles from './ScrollUp.module.scss';
import { ArrowUpIcon } from '@/shared/assets/icons';

export const ScrollUp = () => {
    const [opacity, setOpacity] = useState<number>(0);
    const y = useScrollY();

    useEffect(() => {
        setOpacity((y / document.body.scrollHeight) * 2);
    }, [y]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <Button
            size='m'
            appearance='primary'
            onClick={scrollToTop}
            style={{ opacity: `${opacity}` }}
            className={styles['scroll-up']}
        >
            <ArrowUpIcon />
        </Button>
    );
};

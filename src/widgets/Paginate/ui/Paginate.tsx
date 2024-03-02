import React, { memo, ReactElement, useCallback } from 'react';
import { useAppDispatch } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import styles from './Paginate.module.scss';
import { Text } from '@/shared/ui/Text';
import { IPaginate } from '../model/types';
import { paginateActions } from '@/entities/Products';

export const Paginate = memo(({ currentPage, arr, isLoading }: IPaginate) => {
    const [paginateArray, setPaginateArray] = React.useState<ReactElement[]>(new Array(5).fill(<div />));
    const dispatch = useAppDispatch();
    const start = arr[0];
    const end = arr.length - 1;

    const handleClick = useCallback(
        (number: number) => {
            dispatch(paginateActions.setCurrentPage(number));
            dispatch(paginateActions.setCurrentOffset(number * 50));
            window.scrollTo({ top: 0 });
        },
        [dispatch]
    );

    const constructPaginate = useCallback(
        (newSlideIndex: number) => {
            let idxStart = 0;
            let idxEnd = 4;

            if (newSlideIndex >= idxEnd - 1) {
                idxStart = newSlideIndex - 3;
                if (newSlideIndex < end - 2) {
                    idxEnd = newSlideIndex + 1;
                } else if (newSlideIndex < end - 1) {
                    idxStart = newSlideIndex - 3;
                    idxEnd = newSlideIndex;
                } else {
                    idxStart = newSlideIndex - 5;
                    idxEnd = newSlideIndex - 1;
                }
            }

            const updatePaginate = arr
                .slice(start, end - 1)
                .slice(idxStart, idxEnd)
                .map((dot) => (
                    <Button
                        appearance={newSlideIndex === dot ? 'primary' : 'clear'}
                        size='m'
                        key={dot}
                        type='button'
                        onClick={() => handleClick(dot)}
                        disabled={isLoading}
                    >
                        {dot}
                    </Button>
                ));
            setPaginateArray(updatePaginate);
        },
        [arr, end, handleClick, isLoading, start]
    );

    React.useEffect(() => {
        constructPaginate(currentPage);
    }, [constructPaginate, currentPage]);

    return (
        <div className={styles.paginate}>
            <Button
                appearance={currentPage === start ? 'primary' : 'clear'}
                size='m'
                type='button'
                onClick={() => handleClick(start)}
                disabled={isLoading}
            >
                {start}
            </Button>
            {currentPage > 2 && <Text weight='regular'>...</Text>}
            {paginateArray.map((d, index) => (
                <span key={index}>{d}</span>
            ))}
            {currentPage < arr.length - 2 && <Text weight='regular'>...</Text>}
            <Button
                appearance={currentPage === end ? 'primary' : 'clear'}
                size='m'
                type='button'
                onClick={() => handleClick(end)}
                disabled={isLoading}
            >
                {end}
            </Button>
        </div>
    );
});

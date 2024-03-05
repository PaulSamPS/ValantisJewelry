import React, { memo, ReactElement, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import styles from './Paginate.module.scss';
import { Text } from '@/shared/ui/Text';
import { PaginateProps } from '../model/types';
import { paginateActions } from '../model/slice/paginate.slice';

export const Paginate = memo(({ currentPage, arr, isLoading }: PaginateProps) => {
    const [paginateArray, setPaginateArray] = React.useState<ReactElement[]>(new Array(5).fill(<div />));
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const start = arr[0];
    const end = arr.length - 1;

    const handleClick = useCallback(
        (number: number) => {
            searchParams.set('page', `${number}`);
            setSearchParams(searchParams);
            dispatch(paginateActions.setCurrentPage(number));
            dispatch(paginateActions.setCurrentOffset((number - 1) * 50));
            window.scrollTo({ top: 0 });
        },
        [dispatch, searchParams, setSearchParams]
    );

    const constructPaginate = useCallback(
        (newSlideIndex: number) => {
            let idxStart = 0;
            let idxEnd = 3;

            if (newSlideIndex >= idxEnd) {
                idxStart = newSlideIndex - 3;
                if (newSlideIndex < end - 2) {
                    idxEnd = newSlideIndex;
                } else if (newSlideIndex < end - 1) {
                    idxStart = newSlideIndex - 3;
                    idxEnd = newSlideIndex;
                } else {
                    idxStart = end - 5;
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

    useEffect(() => {
        if (!searchParams.get('page')) {
            searchParams.set('page', `${currentPage}`);
            setSearchParams(searchParams);
        }
    }, [currentPage, searchParams, setSearchParams]);

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
            {currentPage > 3 && <Text weight='regular'>...</Text>}
            {paginateArray.map((d, index) => (
                <span key={index}>{d}</span>
            ))}
            {currentPage < end - 2 && <Text weight='regular'>...</Text>}
            <Button
                appearance={currentPage === (arr.length > 2 ? end : end + 1) ? 'primary' : 'clear'}
                size='m'
                type='button'
                onClick={() => handleClick(arr.length > 2 ? end : end + 1)}
                disabled={isLoading}
            >
                {arr.length > 2 ? end : end + 1}
            </Button>
        </div>
    );
});

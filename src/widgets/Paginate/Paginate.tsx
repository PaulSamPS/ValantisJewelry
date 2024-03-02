import React, { memo, ReactElement, useCallback } from 'react';
import { useAppDispatch } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { paginateActions } from '@/entities/Products/model/slice/pages.slice';
import styles from './Paginate.module.scss';
import { Text } from '@/shared/ui/Text';

interface IPaginate {
    currentPage: number;
    arr: number[];
}
const Paginate = memo(({ currentPage, arr }: IPaginate) => {
    const [dotsArray, setDotsArray] = React.useState<ReactElement[]>(new Array(5).fill(<div />));
    const dispatch = useAppDispatch();
    const start = arr[0];
    const end = arr.length - 1;

    const handleClick = useCallback(
        (number: number) => {
            dispatch(paginateActions.setCurrentPage(number));
            dispatch(paginateActions.setCurrentOffset(number * 50));
            // window.scrollTo({ top: 0 });
        },
        [dispatch]
    );

    const constructDots = useCallback(
        (newSlideIndex: number) => {
            let idxStart = 0;
            let idxEnd = 3;

            if (newSlideIndex >= idxEnd - 1) {
                idxStart = newSlideIndex === end ? newSlideIndex - 3 : newSlideIndex - 2;
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
            console.log(idxStart, idxEnd);

            const updateDots = arr
                .slice(start, end - 1)
                .slice(idxStart, idxEnd)
                .map((dot) => (
                    <Button
                        appearance={newSlideIndex === dot ? 'primary' : 'clear'}
                        size='m'
                        key={dot}
                        type='button'
                        onClick={() => handleClick(dot)}
                    >
                        {dot}
                    </Button>
                ));
            setDotsArray(updateDots);
        },
        [arr, handleClick]
    );

    React.useEffect(() => {
        constructDots(currentPage);
    }, [constructDots, currentPage]);

    return (
        <div className={styles.paginate}>
            <Button
                appearance={currentPage === start ? 'primary' : 'clear'}
                size='m'
                type='button'
                onClick={() => handleClick(start)}
            >
                {start}
            </Button>
            {currentPage > 2 && <Text weight='regular'>...</Text>}
            {dotsArray.map((d, index) => (
                <span key={index}>{d}</span>
            ))}
            {currentPage < arr.length - 2 && <Text weight='regular'>...</Text>}
            <Button
                appearance={currentPage === end ? 'primary' : 'clear'}
                size='m'
                type='button'
                onClick={() => handleClick(end)}
            >
                {end}
            </Button>
        </div>
    );
});

export default Paginate;

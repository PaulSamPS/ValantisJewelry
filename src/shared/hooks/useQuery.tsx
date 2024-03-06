import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { priceRub } from '@/shared/lib/priceRub';

export const useQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [queryValue, setQueryValue] = useState<string>('');
    const [isQuery, setIsQuery] = useState<boolean>(true);

    const onQueryReset = () => {
        setSearchParams({ page: '1' });
    };

    useEffect(() => {
        if (searchParams.has('search')) {
            setQueryValue(`${searchParams.get('search')}`);
            setIsQuery(true);
        } else if (searchParams.has('price')) {
            setQueryValue(`цене ${priceRub(Number(searchParams.get('price')))}`);
            setIsQuery(true);
        } else if (searchParams.has('brand')) {
            const query = searchParams.get('brand');
            if (query === 'null') {
                setQueryValue('продуктам без бренда');
            } else {
                setQueryValue(`бренду ${searchParams.get('brand')}`);
            }
            setIsQuery(true);
        } else {
            setQueryValue('');
            setIsQuery(false);
        }
    }, [searchParams]);

    return { isQuery, queryValue, onQueryReset };
};

import {useEffect, useState} from 'react';
import * as Type from '../types/chartInfo.ts';
import {useSearchParams} from 'react-router-dom';

const useChartFilter = (filterKey: keyof Type.ChartItem, initData: Type.ChartItem[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedKey, setSelectedKey] = useState<Type.ChartSelectedKey>('All');

    useEffect(() => {
        const key = searchParams.get('filter');
        if (key && filterOptions.includes(key)) {
            setSelectedKey(key);
        } else {
            setSelectedKey('All');
            searchParams.set('filter', 'All');
            setSearchParams(searchParams);
        }
    }, []);

    const filterOptions = ['All', ...new Set(initData.map(item => item[filterKey]))];

    const selectFilter = (key: Type.ChartSelectedKey) => {
        if (filterOptions.includes(key!)) {
            setSelectedKey(key);
            searchParams.set('filter', key!.toString());
            setSearchParams(searchParams);
        }
    };

    return {selectedKey, filterOptions, selectFilter};
};

export default useChartFilter;

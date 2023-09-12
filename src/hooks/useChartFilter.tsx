import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {ChartItem, ChartSelectedKey} from '../types/chartInfo';

const useChartFilter = (filterKey: keyof ChartItem, initData: ChartItem[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedKey, setSelectedKey] = useState<ChartSelectedKey>('All');

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

    const selectFilter = (key: ChartSelectedKey) => {
        if (filterOptions.includes(key!)) {
            setSelectedKey(key);
            searchParams.set('filter', key!.toString());
            setSearchParams(searchParams);
        }
    };

    return {selectedKey, filterOptions, selectFilter};
};

export default useChartFilter;

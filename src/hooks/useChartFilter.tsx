import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {ChartItem, ChartSelectedKey} from '../types/chartInfo';

const arrayToObject = (array: (string | number)[]) =>
    array.reduce((obj, item) => ({...obj, [item]: false}), {});

interface SelectedFilters {
    [key: string]: boolean;
}

const useChartFilter = (filterKey: keyof ChartItem, initData: ChartItem[]) => {
    const filterOptions = [...new Set(initData.map(item => item[filterKey]))];
    const initFilters: SelectedFilters = arrayToObject([
        ...new Set(initData.map(item => item[filterKey])),
    ]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(initFilters);

    // useEffect(() => {
    //     const key = searchParams.get('filter');
    //     if (key && filterOptions.includes(key)) {
    //         setSelectedKey(key);
    //     } else {
    //         setSelectedKey('All');
    //         searchParams.set('filter', 'All');
    //         setSearchParams(searchParams);
    //     }
    // }, []);

    const toggleFilter = (key: ChartSelectedKey) => {
        if (key in selectedFilters) {
            setSelectedFilters(prev => ({...prev, [key]: !prev[key]}));
            // searchParams.set('filter', key!.toString());
            setSearchParams(searchParams);
        }
    };

    const resetFilter = () => {
        setSelectedFilters(initFilters);
    };

    return {selectedFilters, filterOptions, toggleFilter, resetFilter};
};

export default useChartFilter;

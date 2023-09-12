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

    useEffect(() => {
        initParams();
    }, []);

    const getFilteredKeys = (selectedFilters: SelectedFilters) => {
        return Object.keys(selectedFilters).filter(key => selectedFilters[key] === true);
    };

    const toggleFilter = (key: ChartSelectedKey) => {
        if (key in selectedFilters) {
            const newValue = !selectedFilters[key];
            setSelectedFilters(prev => ({...prev, [key]: newValue}));

            if (newValue) {
                addParams(key + '');
            } else {
                removeParams(key + '');
            }
        }
    };

    const initParams = () => {
        const params = searchParams.get('filter');
        if (params) {
            const newSelectedFilters: SelectedFilters = initFilters;
            const newParamsArray = params.split(' ').filter(filter => {
                if (filter in initFilters) {
                    newSelectedFilters[filter] = true;
                    return true;
                }
            });
            if (newParamsArray.length) {
                const newParams = newParamsArray.join(' ');
                setSearchParams({filter: newParams});
            } else {
                resetFilter();
            }
            setSelectedFilters(newSelectedFilters);
        } else {
            console.info('reset param');
            resetFilter();
        }
    };

    const addParams = (key: string) => {
        const keysWithTrueValue = getFilteredKeys(selectedFilters);
        const params = [...keysWithTrueValue, key].join(' ');
        setSearchParams({filter: params});
    };

    const removeParams = (key: string) => {
        const params = searchParams
            .get('filter')!
            .split(' ')
            .filter(string => string !== key)
            .join(' ');
        if (params.length) {
            setSearchParams({filter: params});
        } else {
            setSearchParams({});
        }
    };

    const resetFilter = () => {
        setSelectedFilters(initFilters);
        setSearchParams({});
    };

    return {selectedFilters, filterOptions, toggleFilter, resetFilter};
};

export default useChartFilter;

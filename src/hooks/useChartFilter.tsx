import {useState} from 'react';
import * as Type from '../types/chartInfo.ts';

const useChartFilter = (filterKey: keyof Type.ChartItem, initData: Type.ChartItem[]) => {
    const [selectedKey, setSelectedKey] = useState<null | string | number>('All');

    const filterOptions = ['All', ...new Set(initData.map(item => item[filterKey]))];

    return {selectedKey, filterOptions, setSelectedKey};
};

export default useChartFilter;

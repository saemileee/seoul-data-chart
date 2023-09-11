import {useEffect, useState} from 'react';
import useFetch from './useFetch';
import {ChartItem, ResponseData} from '../types/chartInfo';

const useChart = (cb: () => Promise<ResponseData>) => {
    const {state: fetchState} = useFetch(cb);
    const {data: fetchData, isLoading, error} = fetchState;
    const [data, setData] = useState<ChartItem[]>([]);

    useEffect(() => {
        if (fetchData) {
            const newData = Object.entries(fetchData).map(data => {
                const [time, values] = data;
                return {time, ...values};
            });
            setData(newData);
        }
    }, [fetchData]);

    return {data, isLoading, error};
};

export default useChart;

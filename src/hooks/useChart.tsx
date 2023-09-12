import {useEffect, useState} from 'react';
import useFetch from './useFetch';
import {ChartData, ResponseData} from '../types/chartInfo';
import extractCommonTime from '../utils/extractCommonTime';
import formatDate from '../utils/formatDate';

const useChart = (cb: () => Promise<ResponseData>) => {
    const {state: fetchState} = useFetch(cb);
    const {data: fetchData, isLoading, error} = fetchState;
    const [data, setData] = useState<ChartData>({
        commonTime: '',
        data: [],
    });

    useEffect(() => {
        if (fetchData) {
            const timeData = Object.entries(fetchData).map(data => data[0]);
            const prefix = extractCommonTime(timeData);
            const commonTime = formatDate(prefix);

            const newData = Object.entries(fetchData).map(data => {
                const [time, values] = data;
                return {time: time.replace(prefix, ''), ...values};
            });
            setData({commonTime, data: newData});
        }
    }, [fetchData]);

    return {chartData: data, isLoading, error};
};

export default useChart;

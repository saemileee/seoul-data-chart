import {Reducer, useEffect, useReducer} from 'react';
import {AxiosError} from 'axios';
import * as Type from '../../types/seoulInfo.ts';
import {getSeoulInfo} from '../../api/seoulInfo.ts';

interface TypeSeoulChart {
    isLoading: boolean;
    error: null | Error;
    data: Type.SeoulInfoChartItem[];
}

type TypeAction =
    | {type: 'GET'; payload: Type.ResponseData}
    | {type: 'ERROR'; payload: AxiosError}
    | {type: 'FETCHING'}
    | {type: 'INIT'};

const initState = {
    isLoading: true,
    error: null,
    data: [{id: '', time: '', valueArea: 0, valueBar: 0}],
};

const reducer: Reducer<TypeSeoulChart, TypeAction> = (
    state: TypeSeoulInfoState,
    action: TypeAction
) => {
    switch (action.type) {
        case 'GET': {
            const data = action.payload;
            const newData = Object.entries(data).map(data => {
                const [time, values] = data;
                const {id, value_area: valueArea, value_bar: valueBar} = values;
                return {id, time, valueArea, valueBar};
            });
            return {...state, isLoading: false, data: newData};
        }
        case 'ERROR':
            return {...state, isLoading: false, error: action.payload};
        case 'FETCHING':
            return {...state, isLoading: true, error: null};
        case 'INIT':
            return initState;
        default:
            return state;
    }
};

const useSeoulData = () => {
    const [state, dispatch] = useReducer(reducer, initState);

    const getData = async () => {
        try {
            const data = await getSeoulInfo();
            dispatch({type: 'GET', payload: data});
        } catch (e) {
            if (e instanceof AxiosError) dispatch({type: 'ERROR', payload: e});
            console.error(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {state};
};

export default useSeoulData;

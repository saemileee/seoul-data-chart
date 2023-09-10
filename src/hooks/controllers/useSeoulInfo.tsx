import {useEffect, useReducer} from 'react';
import {AxiosError} from 'axios';
import * as Type from '../../types/seoulInfo.ts';
import {getSeoulInfo} from '../../api/seoulInfo.ts';

interface TypeSeoulInfoState {
    isLoading: boolean;
    error: null | Error;
    data: Type.ResponseData;
}

type TypeAction =
    | {type: 'GET'; payload: Type.ResponseData}
    | {type: 'ERROR'; payload: AxiosError}
    | {type: 'FETCHING'}
    | {type: 'INIT'};

const initState = {
    isLoading: true,
    error: null,
    data: {},
};

const reducer = (state: TypeSeoulInfoState, action: TypeAction) => {
    switch (action.type) {
        case 'GET': {
            return {...state, isLoading: false, data: action.payload};
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

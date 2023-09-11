import {useEffect, useReducer} from 'react';
import {AxiosError} from 'axios';

interface State<T> {
    isLoading: boolean;
    error: null | Error;
    data: T | null;
}

type Action<T> =
    | {type: 'SUCCESS'; payload: T}
    | {type: 'ERROR'; payload: AxiosError}
    | {type: 'FETCHING'}
    | {type: 'INIT'};

const initState = {
    isLoading: true,
    error: null,
    data: null,
};

const reducer = <T,>(state: State<T>, action: Action<T>) => {
    switch (action.type) {
        case 'SUCCESS': {
            return {...state, isLoading: false, data: action.payload};
        }
        case 'ERROR':
            return {...state, isLoading: false, error: action.payload};
        case 'FETCHING':
            return {...state, isLoading: true, error: null};
        default:
            return state;
    }
};

const useFetch = <T,>(cb: () => Promise<T>) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const getData = async () => {
        dispatch({type: 'FETCHING'});
        try {
            const data = await cb();
            dispatch({type: 'SUCCESS', payload: data});
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

export default useFetch;

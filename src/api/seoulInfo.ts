import {seoulAPI} from './instance';
import * as Type from '../types/chartInfo';

export const getSeoulInfo = async (): Promise<Type.ResponseData> => {
    const res = await seoulAPI.get('');
    return res.data;
};

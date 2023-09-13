import {seoulAPI} from './instance';
import * as Type from '../types/chartInfo';

export const getSeoulInfo = async (key = ''): Promise<Type.ResponseData> => {
    const res = await seoulAPI.get(key);
    return res.data;
};

import {seoulAPI} from './instance';

export const getSeoulData = async () => {
    const res = await seoulAPI.get('');
    return res.data;
};

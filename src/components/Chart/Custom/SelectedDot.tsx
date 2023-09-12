import {DotProps} from 'recharts';
import React from 'react';

interface CustomDotProps extends DotProps {
    selectedKey: string | number | null;
    payload?: {id: string | number};
    strokeColor?: string;
}

const SelectedDot = ({cx, cy, selectedKey, payload, strokeColor = 'black'}: CustomDotProps) => {
    const {id} = payload!;

    if (id === selectedKey) {
        return <circle cx={cx} cy={cy} r={4} stroke={strokeColor} strokeWidth='2' fill='white' />;
    }
    return <></>;
};

export default SelectedDot;

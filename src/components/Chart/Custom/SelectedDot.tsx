import {DotProps} from 'recharts';

interface CustomDotProps extends DotProps {
    selectedFilters: {[key: string]: boolean; [key: number]: boolean};
    payload?: {id: string | number};
    strokeColor?: string;
}

const SelectedDot = ({cx, cy, selectedFilters, payload, strokeColor = 'black'}: CustomDotProps) => {
    const {id} = payload!;

    if (selectedFilters[id]) {
        return <circle cx={cx} cy={cy} r={4} stroke={strokeColor} strokeWidth='2' fill='white' />;
    }
    return <></>;
};

export default SelectedDot;

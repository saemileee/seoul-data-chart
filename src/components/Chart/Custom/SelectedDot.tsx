import {DotProps} from 'recharts';

interface CustomDotProps extends DotProps {
    selectedKey: string | number | null;
    payload?: any;
}

const SelectedDot = ({cx, cy, selectedKey, payload}: CustomDotProps) => {
    const {id} = payload;

    if (id === selectedKey) {
        return <circle cx={cx} cy={cy} r={4} stroke='#ff6b39' strokeWidth='1' fill='white' />;
    }
    return <></>;
};

export default SelectedDot;

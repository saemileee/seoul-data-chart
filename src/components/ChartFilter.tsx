import {Dispatch, SetStateAction} from 'react';
import {ChartSelectedKey} from '../types/chartInfo';

interface ChartFilterProps {
    selectedKey: ChartSelectedKey;
    setSelectedKey: Dispatch<SetStateAction<ChartSelectedKey>>;
    filterOptions: (string | number)[];
}

const ChartFilter = ({selectedKey, setSelectedKey, filterOptions}: ChartFilterProps) => {
    return (
        <ul>
            {filterOptions.map(option => (
                <li
                    className={`${selectedKey === option && 'selected'}`}
                    key={option}
                    onClick={() => setSelectedKey(option)}
                >
                    {option}
                </li>
            ))}
        </ul>
    );
};

export default ChartFilter;

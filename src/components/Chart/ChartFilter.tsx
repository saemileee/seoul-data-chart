import {Dispatch, SetStateAction} from 'react';
import {ChartSelectedKey} from '../../types/chartInfo';
import styled from 'styled-components';

interface ChartFilterProps {
    selectedKey: ChartSelectedKey;
    setSelectedKey: Dispatch<SetStateAction<ChartSelectedKey>>;
    filterOptions: (string | number)[];
}

const ChartFilter = ({selectedKey, setSelectedKey, filterOptions}: ChartFilterProps) => {
    return (
        <StyledChartContainer>
            {filterOptions.map(option => (
                <StyledFilterButton
                    className={`${selectedKey === option && 'selected'}`}
                    key={option}
                    onClick={() => setSelectedKey(option)}
                >
                    {option}
                </StyledFilterButton>
            ))}
        </StyledChartContainer>
    );
};

export default ChartFilter;

const StyledChartContainer = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 10px;
`;

const StyledFilterButton = styled.li`
    padding: 6px 14px 4px 14px;
    border: 1px solid #bbbbbb;
    border-radius: 30px;
    color: #7a7a7a;
    cursor: pointer;
    &.selected {
        color: white;
        background-color: #217dff;
        border: unset;
    }
`;

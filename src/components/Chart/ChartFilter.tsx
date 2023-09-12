import {ChartSelectedKey} from '../../types/chartInfo';
import styled from 'styled-components';

interface ChartFilterProps {
    selectedKey: ChartSelectedKey;
    selectFilter: (key: ChartSelectedKey) => void;
    filterOptions: (string | number)[];
}

const ChartFilter = ({selectedKey, selectFilter, filterOptions}: ChartFilterProps) => {
    return (
        <StyledChartContainer>
            {filterOptions.map(option => (
                <StyledFilterButton
                    className={`${selectedKey === option && 'selected'}`}
                    key={option}
                    onClick={() => selectFilter(option)}
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
    user-select: none;
    padding: 6px 14px 4px 14px;
    border: 1px solid ${props => props.theme.borderColor};
    border-radius: 30px;
    color: ${props => props.theme.textColorGrey};
    cursor: pointer;
    &.selected {
        color: ${props => props.theme.textColorLight};
        background-color: ${props => props.theme.primaryColor};
        border: unset;
    }
`;

import {ChartSelectedKey} from '../../types/chartInfo';
import styled from 'styled-components';
import {GrPowerReset} from 'react-icons/gr';
import React from 'react';

interface ChartFilterProps {
    // eslint-disable-next-line no-unused-vars
    toggleFilter: (option: ChartSelectedKey) => void;
    selectedFilters: {
        [key: string]: boolean;
        [key: number]: boolean;
    };
    filterOptions: (string | number)[];
    resetFilter: () => void;
}

const ChartFilter = ({
    selectedFilters,
    toggleFilter,
    filterOptions,
    resetFilter,
}: ChartFilterProps) => {
    return (
        <StyledChartContainer>
            <StyledFilterButton onClick={() => resetFilter()}>
                <GrPowerReset />
            </StyledFilterButton>
            {filterOptions.map(option => (
                <StyledFilterButton
                    className={`${selectedFilters[option] === true && 'selected'}`}
                    key={option}
                    onClick={() => toggleFilter(option)}
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

import {TooltipProps} from 'recharts';
import styled from 'styled-components';
import React from 'react';

const CustomTooltip = ({active, payload}: TooltipProps<number, string>): JSX.Element | null => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        const {id, value_area, value_bar} = item;
        return (
            <StyledTooltipContainer>
                <p className='id'>{`📍${id}`}</p>
                <p className='valueArea'>
                    <label>value_area </label>
                    {value_area}
                </p>
                <p className='valueBar'>
                    <label>value_bar </label>
                    {value_bar}
                </p>
            </StyledTooltipContainer>
        );
    }

    return null;
};

export default CustomTooltip;

const StyledTooltipContainer = styled.div`
    padding: 6px 14px 6px 14px;
    border: 1px solid ${props => props.theme.borderColor};
    border-radius: 6px;
    background-color: ${props => props.theme.tooltipBg};
    p {
        color: ${props => props.theme.textColorDefault};
        padding: 2px 0 4px 0;
        margin: 0;
        margin-bottom: 6px;
    }
    .id {
        border-bottom: 1px solid ${props => props.theme.borderColor};
    }
    label {
        font-weight: 500;
    }
    .valueArea {
        label {
            color: ${props => props.theme.areaStroke};
        }
    }
    .valueBar {
        label {
            color: ${props => props.theme.barSelectedColor};
        }
    }
    .id {
        font-weight: 600;
    }
`;

import {TooltipProps} from 'recharts';
import styled from 'styled-components';

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
    border: 1px solid #dddd;
    border-radius: 6px;
    background-color: #ffffffc0;
    p {
        padding: 2px 0 4px 0;
        margin: 0;
        margin-bottom: 6px;
    }
    .id {
        border-bottom: 1px solid #dddd;
    }
    label {
        font-weight: 500;
    }
    .valueArea {
        label {
            color: #ff9100dd;
        }
    }
    .valueBar {
        label {
            color: #1aa683dd;
        }
    }
    .id {
        font-weight: 600;
    }
`;

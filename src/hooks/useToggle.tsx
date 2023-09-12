import {useState} from 'react';
import styled from 'styled-components';

interface ToggleProps {
    label?: string;
    innerLabel?: string;
}

const useToggle = (initActiveState = false) => {
    const [isActive, setIsActive] = useState(initActiveState);

    const toggleActive = () => {
        setIsActive(prev => !prev);
    };

    const Toggle = ({label, innerLabel}: ToggleProps) => {
        return (
            <StyledToggleContainer>
                <label>{label}</label>
                <div className={`toggle ${isActive && 'active'}`} onClick={() => toggleActive()}>
                    <button className='button'></button>
                    <span>{innerLabel}</span>
                </div>
            </StyledToggleContainer>
        );
    };

    return {isActive, Toggle};
};

export default useToggle;

const StyledToggleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    label {
        color: ${props => props.theme.textColorDefault};
    }
    .toggle {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 6px;
        box-sizing: content-box;
        padding: 4px;
        height: 24px;
        background-color: ${props => props.theme.buttonDefault};
        border: 1px solid ${props => props.theme.borderColor};
        border-radius: 30px;
        button {
            background-color: #ffff;
            border: none;
            box-shadow: 0 0 8px #a9a9a9dd;
            aspect-ratio: 1;
            border-radius: 50%;
            height: inherit;
        }
        span {
            user-select: none;
            margin-right: 8px;
            font-size: 14px;
            color: ${props => props.theme.textColorGrey};
        }
        &.active {
            flex-direction: row-reverse;
            text-align: right;
            background-color: ${props => props.theme.primaryColor};
            span {
                margin-right: 0px;
                margin-left: 8px;
                color: #fff;
            }
        }
        cursor: pointer;
    }
`;

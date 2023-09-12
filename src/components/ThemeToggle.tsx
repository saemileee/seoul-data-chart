import styled from 'styled-components';

interface ToggleProps {
    toggle: () => void;
    mode: string;
}

const ThemeToggle = ({toggle, mode}: ToggleProps) => {
    return (
        <ToggleWrapper onClick={toggle} mode={mode}>
            {mode === 'darkTheme' ? '🌚' : '🌝'}
        </ToggleWrapper>
    );
};

export default ThemeToggle;

interface ToggleWrapperProps {
    mode: string;
}

const ToggleWrapper = styled.button<ToggleWrapperProps>`
    position: fixed;
    z-index: 999999;
    bottom: 4%;
    right: 3%;

    background-color: ${props => props.theme.bgColor};
    border: ${props => props.theme.borderColor};
    font-size: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 96px;
    height: 48px;
    border-radius: 30px;
    box-shadow: ${props => props.theme.boxShadow};
`;

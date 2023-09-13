import {ReactNode, useEffect, useState} from 'react';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';

interface DeferredComponentProps {
    loadingComponent: ReactNode;
    children: ReactNode;
}

const DeferredComponent = ({children, loadingComponent}: DeferredComponentProps) => {
    const [isDeferred, setIsDeferred] = useState(false);
    const debounce = useDebounce();

    useEffect(() => {
        debounce(() => setIsDeferred(true), 500);
    }, []);

    return (
        <StyledDeferContainer>
            <div className='loading-container'>{!isDeferred && loadingComponent}</div>
            <div style={{visibility: isDeferred ? 'visible' : 'hidden'}}>{children}</div>
        </StyledDeferContainer>
    );
};

export default DeferredComponent;

const StyledDeferContainer = styled.div`
    position: initial;
    .loading-container {
        position: absolute;
        z-index: 999;
        left: 50%;
        transform: translateX(-50%) translateY(10%);
    }
`;

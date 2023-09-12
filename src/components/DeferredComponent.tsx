import React, {ReactNode, useEffect, useState} from 'react';
import useDebounce from '../hooks/useDebounce';

interface DeferredComponentProps {
    loadingComponent: ReactNode;
    children: ReactNode;
}

const DeferredComponent = ({children, loadingComponent}: DeferredComponentProps) => {
    const [isDeferred, setIsDeferred] = useState(false);
    const debounce = useDebounce();

    useEffect(() => {
        debounce(() => setIsDeferred(true), 700);
    }, []);

    if (!isDeferred) {
        return <>{loadingComponent}</>;
    }

    return <>{children}</>;
};

export default DeferredComponent;

import {useRef} from 'react';

const useDebounce = () => {
    const timer = useRef<number | null>(null);
    return (cb: (...args: any[]) => any, debounceTime: number) => {
        timer.current && clearTimeout(timer.current);
        timer.current = setTimeout(cb, debounceTime);
    };
};

export default useDebounce;

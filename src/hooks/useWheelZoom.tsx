import {useCallback, useState} from 'react';

const useWheelZoom = (initIdx: number[]) => {
    const [INIT_START_IDX, INIT_END_IDX] = initIdx;
    const [zoomedIdx, setZoomedIdx] = useState<number[] | null>(null);

    const zoomIn = useCallback((fixedIdx: number, startIdx: number, endIdx: number) => {
        const leftCounts = fixedIdx - startIdx;
        const rightCounts = endIdx - fixedIdx;
        const [leftStep, rightStep] =
            leftCounts < rightCounts
                ? [1, Math.floor(rightCounts / leftCounts)]
                : [Math.floor(leftCounts / rightCounts), 1];

        if (startIdx + 1 !== endIdx && startIdx !== endIdx) {
            setZoomedIdx([startIdx + leftStep, endIdx - rightStep]);
        }
    }, []);

    const zoomOut = useCallback((fixedIdx: number, startIdx: number, endIdx: number) => {
        const leftCounts = fixedIdx - startIdx;
        const rightCounts = endIdx - fixedIdx;
        const [leftStep, rightStep] =
            leftCounts < rightCounts
                ? [1, Math.floor(rightCounts / leftCounts)]
                : [Math.floor(leftCounts / rightCounts), 1];

        setZoomedIdx(() => {
            const newStartIdx = Math.max(
                startIdx - (leftCounts === rightCounts ? 2 : leftStep),
                INIT_START_IDX
            );

            const newEndIdx = Math.min(
                endIdx + (leftCounts === rightCounts ? 2 : rightStep),
                INIT_END_IDX
            );

            return [newStartIdx, newEndIdx];
        });
    }, []);

    const zoomInOrOut = useCallback(
        (
            e: React.WheelEvent<SVGPathElement>,
            fixedIdx: number,
            startIdx: number,
            endIdx: number
        ) => {
            if (e.deltaY < 0) {
                zoomIn(fixedIdx, startIdx, endIdx);
            } else if (e.deltaY > 0) {
                zoomOut(fixedIdx, startIdx, endIdx);
            }
        },
        []
    );

    return {zoomedIdx, zoomInOrOut};
};

export default useWheelZoom;

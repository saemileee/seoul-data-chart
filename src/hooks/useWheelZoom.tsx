import {useState} from 'react';

const DEFAULT_STEP = 2;

const useWheelZoom = (initIdx: number[]) => {
    const [INIT_START_IDX, INIT_END_IDX] = initIdx;
    const [zoomedIdx, setZoomedIdx] = useState<number[] | null>(null);

    const getSteps = (fixedIdx: number, startIdx: number, endIdx: number) => {
        const leftCounts = fixedIdx - startIdx;
        const rightCounts = endIdx - fixedIdx;

        if (leftCounts !== 0 && rightCounts !== 0) {
            const [leftStep, rightStep] =
                leftCounts < rightCounts
                    ? [1, Math.floor(rightCounts / leftCounts)]
                    : [Math.floor(leftCounts / rightCounts), 1];
            return [leftStep, rightStep, leftCounts, rightCounts];
        }
        if (leftCounts === 0) {
            if (rightCounts < DEFAULT_STEP) {
                return [0, 1];
            } else {
                return [0, Math.floor(rightCounts / DEFAULT_STEP), leftCounts, rightCounts];
            }
        }

        if (rightCounts === 0) {
            if (leftCounts < 2) {
                return [1, 0];
            } else {
                return [Math.floor(leftCounts / DEFAULT_STEP), 0, leftCounts, rightCounts];
            }
        }
        return [0, 0];
    };

    const zoomIn = (fixedIdx: number, startIdx: number, endIdx: number) => {
        if (startIdx !== endIdx) {
            const [leftStep, rightStep] = getSteps(fixedIdx, startIdx, endIdx);
            if (startIdx + leftStep <= endIdx - rightStep) {
                setZoomedIdx([startIdx + leftStep, endIdx - rightStep]);
            }
        }
    };

    const zoomOut = (fixedIdx: number, startIdx: number, endIdx: number) => {
        if (
            zoomedIdx &&
            zoomedIdx.length > 0 &&
            (zoomedIdx[0] !== INIT_START_IDX || zoomedIdx[1] !== INIT_END_IDX)
        ) {
            const [leftStep, rightStep] = getSteps(fixedIdx, startIdx, endIdx);

            setZoomedIdx(prev => [
                prev![0] - leftStep < INIT_START_IDX ? INIT_START_IDX : prev![0] - leftStep,
                prev![1] + rightStep > INIT_END_IDX ? INIT_END_IDX : prev![1] + rightStep,
            ]);
        }
    };

    const zoomInOrOut = (
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
    };

    return {zoomedIdx, zoomInOrOut};
};

export default useWheelZoom;

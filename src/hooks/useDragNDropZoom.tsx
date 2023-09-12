import React, {useState} from 'react';

const useDragNDropZoom = (top: number = 0, height: number = 0, clientWidth: number = 0) => {
    const [zoomedIdx, setZoomedIdx] = useState<null | number[]>(null);
    const [onMouseDownClientX, setOnMouseDownClientX] = useState(0);
    const [onMouseDownIdx, setOnMouseDownIdx] = useState(0);
    const [dragBoxData, setDragBoxData] = useState<{
        left: number | 'unset';
        right: number | 'unset';
        top: number;
        width: number;
        height: number;
    } | null>(null);

    const startDrawBox = (e: React.MouseEvent, idx: number) => {
        setDragBoxData({
            left: 0,
            right: 0,
            top: top,
            width: 0,
            height: 0,
        });
        setOnMouseDownClientX(e.clientX);
        setOnMouseDownIdx(idx);
    };

    const drawBox = (e: React.MouseEvent) => {
        const currentClientX = e.clientX;
        const isMovingToRight = onMouseDownClientX - currentClientX < 0;

        if (!dragBoxData) return;
        if (isMovingToRight) {
            setDragBoxData({
                ...dragBoxData,
                left: onMouseDownClientX,
                right: 'unset',
                width: currentClientX - onMouseDownClientX - 4,
                height,
            });
        } else {
            setDragBoxData({
                ...dragBoxData,
                left: 'unset',
                right: clientWidth - onMouseDownClientX + 92,
                width: onMouseDownClientX - currentClientX + 2,
                height,
            });
        }
    };

    const dragNDropZoomIn = (idx: number) => {
        if (onMouseDownIdx > idx) {
            setZoomedIdx([idx, onMouseDownIdx]);
        } else if (onMouseDownIdx < idx) {
            setZoomedIdx([onMouseDownIdx, idx]);
        } else {
            setZoomedIdx([idx, idx]);
        }
    };

    const endDrawBox = (idx: number) => {
        dragNDropZoomIn(idx);
        setDragBoxData(null);
    };

    return {
        zoomedIdx,
        dragBoxData,
        startDrawBox,
        drawBox,
        endDrawBox,
    };
};

export default useDragNDropZoom;

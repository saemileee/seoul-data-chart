import {useState} from 'react';

const useDragNDropZoom = (containerRef: any) => {
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
        const offsetTop = containerRef.current!.offsetTop;
        setDragBoxData({
            left: 0,
            right: 0,
            top: offsetTop,
            width: 0,
            height: 0,
        });
        setOnMouseDownClientX(e.clientX);
        setOnMouseDownIdx(idx);
    };

    const drawBox = (e: any) => {
        const currentClientX = e.clientX;
        const clientWidth = containerRef.current!.clientWidth;
        const isMovingToRight = onMouseDownClientX - currentClientX < 0;

        if (!dragBoxData) return;
        if (isMovingToRight) {
            setDragBoxData({
                ...dragBoxData,
                left: onMouseDownClientX,
                right: 'unset',
                width: currentClientX - onMouseDownClientX - 4,
                height: 272,
            });
        } else {
            setDragBoxData({
                ...dragBoxData,
                right: clientWidth - onMouseDownClientX,
                left: 'unset',
                width: onMouseDownClientX - currentClientX - 4,
                height: 271,
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

import {
    ComposedChart,
    Area,
    Brush,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Cell,
    ReferenceArea,
    Label,
} from 'recharts';
import {ChartItem, ChartSelectedKey} from '../../types/chartInfo';
import {Dispatch, SetStateAction, useRef, useState} from 'react';
import SelectedDot from './Custom/SelectedDot';
import CustomTooltip from './Custom/Tooltip';
import useDebounce from '../../hooks/useDebounce';

interface ChartProps {
    data: ChartItem[];
    selectedKey: ChartSelectedKey;
    setSelectedKey: Dispatch<SetStateAction<ChartSelectedKey>>;
}

const Chart = ({data, selectedKey = null, setSelectedKey}: ChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const INIT_START_IDX = 0;
    const INIT_END_IDX = data.length - 1;
    const [startIdx, setStartIdx] = useState(INIT_START_IDX);
    const [endIdx, setEndIdx] = useState(INIT_END_IDX);
    const [zoomCounts, setZoomCounts] = useState(0);
    const [fixedIdx, setFixedIdx] = useState(0);
    const [onMouseDownClientX, setOnMouseDownClientX] = useState(0);
    const [onMouseDownIdx, setOnMouseDownIdx] = useState(0);
    const [dragBoxData, setDragBoxData] = useState<{
        left: number | string;
        right: number | string;
        top: number;
        width: number;
        height: number;
    } | null>(null);

    const debounce = useDebounce();

    const zoomIn = () => {
        if (startIdx + 1 !== endIdx && startIdx !== endIdx) {
            setZoomCounts(prev => prev + 1);
            setStartIdx(startIdx + 1);
            setEndIdx(endIdx - 1);
        }
    };

    const zoomOut = () => {
        if (startIdx !== INIT_START_IDX && endIdx !== INIT_END_IDX) {
            setZoomCounts(prev => prev - 1);
            setStartIdx(startIdx - 1);
            setEndIdx(endIdx + 1);
        }
    };

    const dragNDropZoomIn = (idx: number) => {
        if (onMouseDownIdx > idx) {
            setStartIdx(idx);
            setEndIdx(onMouseDownIdx);
        } else if (onMouseDownIdx < idx) {
            setStartIdx(onMouseDownIdx);
            setEndIdx(idx);
        } else {
            setStartIdx(idx);
            setEndIdx(idx);
        }
        setZoomCounts(prev => prev + 1);
    };

    const resetZoom = () => {
        if (startIdx !== INIT_START_IDX || endIdx !== INIT_END_IDX) {
            setStartIdx(INIT_START_IDX);
            setEndIdx(INIT_END_IDX);
            setZoomCounts(prev => prev + 1);
        }
    };

    const handleChangeBrush = (startIndex: number, endIndex: number) => {
        debounce(() => {
            setStartIdx(startIndex!);
            setEndIdx(endIndex!);
        }, 300);
    };

    const startDrawBox = (e: any) => {
        const offsetTop = containerRef.current!.offsetTop;
        setDragBoxData({
            left: 0,
            right: 0,
            top: offsetTop,
            width: 0,
            height: 0,
        });
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

    const endDrawBox = () => {
        setDragBoxData(null);
    };

    return (
        <div
            style={{
                width: '100vw',
                position: 'initial',
            }}
        >
            {dragBoxData && (
                <div
                    style={{
                        zIndex: 999,
                        position: 'absolute',
                        border: '1px solid black',
                        left: `${dragBoxData.left === 'unset' ? 'unset' : `${dragBoxData.left}px`}`,
                        right: `${
                            dragBoxData.right === 'unset' ? 'unset' : `${dragBoxData.right}px`
                        }`,
                        top: `${dragBoxData.top}px`,
                        width: `${dragBoxData.width}px`,
                        height: `${dragBoxData.height}px`,
                    }}
                />
            )}

            <button onClick={() => resetZoom()}>Reset Zoom</button>
            <div
                onWheel={e => {
                    if (e.deltaY < 0) {
                        zoomIn();
                    } else if (e.deltaY > 0) {
                        zoomOut();
                    }
                }}
                ref={containerRef}
            >
                <ComposedChart key={zoomCounts} width={1000} height={400} data={data}>
                    <XAxis dataKey='time' height={40}>
                        <Label value='2023년' position='insideBottom' />
                    </XAxis>
                    <YAxis yAxisId='left' />
                    <YAxis yAxisId='right' orientation='right' />
                    <Legend />

                    <Tooltip content={<CustomTooltip />} />

                    <Bar dataKey='value_bar' fill='#82ca9d' barSize={20} yAxisId='right'>
                        {data.map((entry, index) => (
                            <Cell
                                cursor='pointer'
                                fill={entry.id === selectedKey ? ' #01b07b' : '#a7e9c0'}
                                key={`cell-${index}`}
                            />
                        ))}
                    </Bar>
                    <defs>
                        <linearGradient id='colorArea' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='5%' stopColor='#ff6b39' stopOpacity={1} />
                            <stop offset='95%' stopColor='#ff6b39' stopOpacity={0.3} />
                        </linearGradient>
                    </defs>
                    <Area
                        key={selectedKey}
                        dataKey='value_area'
                        type='monotone'
                        fill='url(#colorArea)'
                        stroke='#ff6b39'
                        yAxisId='left'
                        dot={<SelectedDot selectedKey={selectedKey} />}
                    />
                    {data.map((data, idx) => {
                        const {time, id} = data;
                        return (
                            <ReferenceArea
                                onMouseMove={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setFixedIdx(idx);
                                    drawBox(e);
                                }}
                                onMouseDown={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setOnMouseDownIdx(idx);
                                    startDrawBox(e);
                                    setOnMouseDownClientX(e.clientX);
                                }}
                                onMouseUp={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    dragNDropZoomIn(idx);
                                    endDrawBox();
                                }}
                                key={time}
                                yAxisId='right'
                                x1={time}
                                x2={time}
                                fill='#7ef5fb'
                                opacity={`${id === selectedKey ? 0.5 : 0}`}
                                onClick={() => {
                                    setSelectedKey(id);
                                }}
                            />
                        );
                    })}

                    <Brush
                        dataKey='time'
                        travellerWidth={10}
                        height={60}
                        fill='#ffffff'
                        startIndex={startIdx}
                        endIndex={endIdx}
                        onChange={e => {
                            handleChangeBrush(e.startIndex!, e.endIndex!);
                        }}
                    >
                        <ComposedChart width={1000} height={400} data={data}>
                            <Bar dataKey='value_bar' fill='#82ca9d' barSize={20} yAxisId='right'>
                                {data.map((entry, index) => (
                                    <Cell
                                        cursor='pointer'
                                        fill={entry.id === selectedKey ? ' #82ca9d' : '#abdcbe'}
                                        key={`cell-${index}`}
                                    />
                                ))}
                            </Bar>
                            <Area
                                key={selectedKey}
                                dataKey='value_area'
                                type='monotone'
                                fill='#ff885c94'
                                stroke='#ff875c'
                                yAxisId='left'
                                dot={<SelectedDot selectedKey={selectedKey} />}
                            />
                        </ComposedChart>
                    </Brush>
                </ComposedChart>
            </div>
        </div>
    );
};

export default Chart;

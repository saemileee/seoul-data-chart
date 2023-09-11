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
import {Dispatch, SetStateAction, useState} from 'react';
import SelectedDot from './Custom/SelectedDot';
import CustomTooltip from './Custom/Tooltip';
import useDebounce from '../../hooks/useDebounce';

interface ChartProps {
    data: ChartItem[];
    selectedKey: ChartSelectedKey;
    setSelectedKey: Dispatch<SetStateAction<ChartSelectedKey>>;
}

const Chart = ({data, selectedKey = null, setSelectedKey}: ChartProps) => {
    const [startIdx, setStartIdx] = useState(0);
    const [endIdx, setEndIdx] = useState(99);
    const [zoomCounts, setZoomCounts] = useState(0);
    const [fixedIdx, setFixedIdx] = useState(0);
    const [onMouseDownIdx, setOnMouseDownIdx] = useState(0);
    const debounce = useDebounce();

    const zoomIn = () => {
        if (startIdx + 1 !== endIdx && startIdx !== endIdx) {
            setZoomCounts(prev => prev + 1);
            setStartIdx(startIdx + 1);
            setEndIdx(endIdx - 1);
        }
    };

    const zoomOut = () => {
        if (startIdx !== 0 && endIdx !== 99) {
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

    const handleChangeBrush = (startIndex: number, endIndex: number) => {
        debounce(() => {
            setStartIdx(startIndex!);
            setEndIdx(endIndex!);
        }, 300);
    };

    return (
        <div
            onWheel={e => {
                if (e.deltaY < 0) {
                    zoomIn();
                } else if (e.deltaY > 0) {
                    zoomOut();
                }
            }}
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
                            onMouseMove={() => {
                                setFixedIdx(idx);
                            }}
                            onMouseDown={() => {
                                setOnMouseDownIdx(idx);
                            }}
                            onMouseUp={() => dragNDropZoomIn(idx)}
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
                    <ComposedChart width={1000} height={400} data={data} onClick={console.info}>
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
    );
};

export default Chart;

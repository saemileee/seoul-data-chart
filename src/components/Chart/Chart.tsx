import {MdZoomOutMap} from 'react-icons/md';
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
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import {ChartItem} from '../../types/chartInfo';
import React, {useEffect, useRef, useState} from 'react';
import SelectedDot from './Custom/SelectedDot';
import CustomTooltip from './Custom/Tooltip';
import useDebounce from '../../hooks/useDebounce';
import useDragNDropZoom from '../../hooks/useDragNDropZoom';
import styled from 'styled-components';
import DragZoomInBox from './Custom/DragZoomInBox';
import useWheelZoom from '../../hooks/useWheelZoom';
import useToggle from '../../hooks/useToggle';
import ChartFilter from './ChartFilter';
import useChartFilter from '../../hooks/useChartFilter';
import useTheme from '../../hooks/useTheme';
import LoadingSpinner from '../LoadingSpinner';
import DeferredComponent from '../DeferredComponent';

interface ChartProps {
    data: ChartItem[];
}

const INIT_START_IDX = 0;

const Chart = ({data}: ChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {themeObject} = useTheme();

    const INIT_END_IDX = data.length - 1;

    const [startIdx, setStartIdx] = useState(INIT_START_IDX);
    const [endIdx, setEndIdx] = useState(INIT_END_IDX);
    const [zoomCounts, setZoomCounts] = useState(0);

    const {zoomedIdx: wheelZoomIdx, zoomInOrOut} = useWheelZoom([INIT_START_IDX, INIT_END_IDX]);
    const {selectedFilters, filterOptions, toggleFilter, resetFilter} = useChartFilter('id', data);

    const {
        zoomedIdx: dragNDropIdx,
        dragBoxData,
        startDrawBox,
        drawBox,
        endDrawBox,
    } = useDragNDropZoom(containerRef);

    const {isActive: isZoomModeActive, Toggle} = useToggle();

    useEffect(() => {
        if (wheelZoomIdx?.length) {
            setStartIdx(wheelZoomIdx[0]);
            setEndIdx(wheelZoomIdx[1]);
            setZoomCounts(prev => prev + 1);
        }
    }, [wheelZoomIdx]);

    useEffect(() => {
        if (dragNDropIdx?.length) {
            setStartIdx(dragNDropIdx[0]);
            setEndIdx(dragNDropIdx[1]);
            setZoomCounts(prev => prev + 1);
        }
    }, [dragNDropIdx]);

    const debounce = useDebounce();

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

    return (
        <StyledChartContainer>
            {isZoomModeActive && dragBoxData && <DragZoomInBox dragBoxData={dragBoxData} />}
            <StyledButtonContainer>
                <ChartFilter
                    selectedFilters={selectedFilters}
                    toggleFilter={toggleFilter}
                    filterOptions={filterOptions}
                    resetFilter={resetFilter}
                />
                <StyledZoomButtonContainer>
                    <Toggle innerLabel='Zoom' />
                    <StyledZoomButton onClick={() => resetZoom()}>
                        <MdZoomOutMap size={17} />
                    </StyledZoomButton>
                </StyledZoomButtonContainer>
            </StyledButtonContainer>
            <DeferredComponent loadingComponent={<LoadingSpinner />}>
                <div ref={containerRef}>
                    <ResponsiveContainer width='100%' height={400}>
                        <ComposedChart
                            width={760}
                            height={500}
                            key={zoomCounts}
                            data={data}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                            <XAxis
                                dataKey='time'
                                height={40}
                                tickMargin={12}
                                stroke={themeObject.axisStroke}
                            >
                                <Label
                                    value='2023년 2월 1일'
                                    position='insideBottom'
                                    dy={15}
                                    fontSize={14}
                                    className='xAxisLabel'
                                    color={themeObject.textColorDefault}
                                />
                            </XAxis>
                            <YAxis
                                stroke={themeObject.axisStroke}
                                yAxisId='left'
                                className='yAxis'
                            />
                            <YAxis
                                stroke={themeObject.axisStroke}
                                yAxisId='right'
                                orientation='right'
                                className='yAxis'
                            />
                            <Legend
                                wrapperStyle={{
                                    paddingTop: '20px',
                                }}
                            />

                            <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
                            <CartesianGrid strokeDasharray='3 3' stroke={themeObject.axisStroke} />

                            <defs>
                                <linearGradient id='colorBar' x1='0' y1='0' x2='0' y2='1'>
                                    <stop
                                        offset='50%'
                                        stopColor={themeObject.barStopColorStart}
                                        stopOpacity={1}
                                    />
                                    <stop
                                        offset='100%'
                                        stopColor={themeObject.barStopColorEnd}
                                        stopOpacity={0.3}
                                    />
                                </linearGradient>
                            </defs>
                            <Bar
                                isAnimationActive={false}
                                dataKey='value_bar'
                                fill='url(#colorBar)'
                                barSize={20}
                                yAxisId='right'
                            ></Bar>
                            <defs>
                                <linearGradient id='colorArea' x1='0' y1='0' x2='0' y2='1'>
                                    <stop
                                        offset='50%'
                                        stopColor={themeObject.areaStopColorStart}
                                        stopOpacity={1}
                                    />
                                    <stop
                                        offset='100%'
                                        stopColor={themeObject.areaStopColorEnd}
                                        stopOpacity={0.3}
                                    />
                                </linearGradient>
                            </defs>
                            <Area
                                isAnimationActive={false}
                                dataKey='value_area'
                                type='monotone'
                                fill='url(#colorArea)'
                                stroke={themeObject.areaStroke}
                                yAxisId='left'
                                dot={
                                    <SelectedDot
                                        selectedFilters={selectedFilters}
                                        strokeColor={themeObject.areaStroke}
                                    />
                                }
                            />
                            {data.map((data, idx) => {
                                const {time, id} = data;
                                return (
                                    <ReferenceArea
                                        onWheel={e => zoomInOrOut(e, idx, startIdx, endIdx)}
                                        onMouseMove={e => {
                                            isZoomModeActive && drawBox(e);
                                        }}
                                        onMouseDown={e => {
                                            isZoomModeActive && startDrawBox(e, idx);
                                        }}
                                        onMouseUp={() => {
                                            isZoomModeActive && endDrawBox(idx);
                                        }}
                                        key={time}
                                        yAxisId='right'
                                        x1={time}
                                        x2={time}
                                        fill={themeObject.referenceAreaFill}
                                        opacity={`${selectedFilters[id] ? 0.5 : 0}`}
                                        onClick={() => {
                                            !isZoomModeActive && toggleFilter(id);
                                        }}
                                    />
                                );
                            })}

                            <Brush
                                className='brush'
                                dataKey='time'
                                travellerWidth={10}
                                stroke={themeObject.borderColor}
                                height={40}
                                fill={themeObject.bgColor}
                                startIndex={startIdx}
                                endIndex={endIdx}
                                onChange={e => {
                                    handleChangeBrush(e.startIndex!, e.endIndex!);
                                }}
                            >
                                <ComposedChart width={1000} height={400} data={data}>
                                    <Bar
                                        isAnimationActive={false}
                                        dataKey='value_bar'
                                        fill={themeObject.barSelectedColor}
                                        barSize={20}
                                        yAxisId='right'
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                cursor='pointer'
                                                fill={
                                                    selectedFilters[entry.id]
                                                        ? themeObject.barSelectedColor
                                                        : themeObject.barStopColorStart
                                                }
                                                key={`cell-${index}`}
                                            />
                                        ))}
                                    </Bar>
                                    <Area
                                        isAnimationActive={false}
                                        dataKey='value_area'
                                        type='monotone'
                                        fill={themeObject.areaStopColorStart}
                                        stroke={themeObject.areaStroke}
                                        yAxisId='left'
                                        dot={
                                            <SelectedDot
                                                selectedFilters={selectedFilters}
                                                strokeColor={themeObject.areaStroke}
                                            />
                                        }
                                    />
                                </ComposedChart>
                            </Brush>
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </DeferredComponent>
        </StyledChartContainer>
    );
};

export default Chart;

const StyledChartContainer = styled.div`
    min-width: 320px;
    position: initial;
    padding: 25px 0 20px 0;
    margin-top: 32px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: ${props => props.theme.bgColor};
    box-shadow: 0 0 20px ${props => props.theme.boxShadow};
    .yAxis {
        user-select: none;
    }
`;

const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const StyledZoomButtonContainer = styled.div`
    margin-right: 24px;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 12px;
`;

const StyledZoomButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 6px 8px 6px 8px;
    border: 1px solid ${props => props.theme.borderColor};
    border-radius: 8px;
    color: ${props => props.theme.textColorGrey};
    background-color: ${props => props.theme.buttonDefault};
    cursor: pointer;
    box-shadow: 0 0 10px ${props => props.theme.boxShadow};
    font-size: 16px;
`;

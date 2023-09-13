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
import {ChartData} from '../../types/chartInfo';
import {useEffect, useRef, useState} from 'react';
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
    chartData: ChartData;
    initZoomStartIdx?: number;
    initZoomEndIdx?: number;
}

const Chart = ({
    chartData,
    initZoomStartIdx = 0,
    initZoomEndIdx = chartData.data.length - 1,
}: ChartProps) => {
    const {themeMode, themeObject} = useTheme();

    const gridRef = useRef<CartesianGrid>(null);
    const legendRef = useRef<HTMLSpanElement>(null);
    const chartContainer = useRef<HTMLDivElement>(null);

    const zoomBoxTop = legendRef.current
        ? legendRef.current.offsetParent!.getBoundingClientRect().bottom
        : 0;
    const zoomBoxHeight = gridRef.current ? gridRef.current.props.height : 1;
    const chartContainerWidth = chartContainer.current ? chartContainer.current.clientWidth : 0;

    const {commonTime, data} = chartData;

    const [zoom, setZoom] = useState({
        startIdx: initZoomStartIdx,
        endIdx: initZoomEndIdx,
        counts: 0,
    });

    const {zoomedIdx: wheelZoomIdx, zoomInOrOut} = useWheelZoom([initZoomStartIdx, initZoomEndIdx]);

    const {selectedFilters, filterOptions, toggleFilter, resetFilter} = useChartFilter('id', data);

    const {
        zoomedIdx: dragNDropIdx,
        dragBoxData,
        startDrawBox,
        drawBox,
        endDrawBox,
    } = useDragNDropZoom(zoomBoxTop, zoomBoxHeight, chartContainerWidth);

    const {isActive: isZoomModeActive, Toggle} = useToggle();

    useEffect(() => {
        if (wheelZoomIdx?.length) {
            setZoom({startIdx: wheelZoomIdx[0], endIdx: wheelZoomIdx[1], counts: zoom.counts + 1});
        }
    }, [wheelZoomIdx]);

    useEffect(() => {
        if (dragNDropIdx?.length) {
            setZoom({startIdx: dragNDropIdx[0], endIdx: dragNDropIdx[1], counts: zoom.counts + 1});
        }
    }, [dragNDropIdx]);

    const resetZoom = () => {
        if (zoom.startIdx !== initZoomStartIdx || zoom.endIdx !== initZoomEndIdx) {
            setZoom({startIdx: initZoomStartIdx, endIdx: initZoomEndIdx, counts: zoom.counts + 1});
        }
    };

    const debounce = useDebounce();

    const handleChangeBrush = (startIdx: number, endIdx: number) => {
        debounce(() => {
            setZoom(prev => ({...prev, startIdx, endIdx}));
        }, 300);
    };

    return (
        <StyledChartContainer>
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
                <div ref={chartContainer}>
                    {isZoomModeActive && dragBoxData && <DragZoomInBox dragBoxData={dragBoxData} />}
                    <ResponsiveContainer width='100%' height={550}>
                        <ComposedChart
                            key={zoom.counts}
                            data={data}
                            margin={{top: 35, right: 30, left: 20, bottom: 45}}
                        >
                            <XAxis
                                dataKey='time'
                                height={40}
                                tickMargin={12}
                                stroke={themeObject.axisStroke}
                            >
                                <Label
                                    value={`Time : ${commonTime}`}
                                    position='insideLeft'
                                    dy={24}
                                    dx={0}
                                    fontSize={14}
                                    className='xAxisLabel'
                                    color={themeObject.textColorDefault}
                                />
                            </XAxis>

                            <YAxis
                                stroke={themeObject.barSelectedColor}
                                yAxisId='left'
                                className='yAxis'
                            >
                                <Label
                                    value='value_bar'
                                    position='top'
                                    dy={-20}
                                    fontSize={14}
                                    className='xAxisLabel'
                                    fill={themeObject.barSelectedColor}
                                />
                            </YAxis>

                            <YAxis
                                stroke={themeObject.areaStroke}
                                orientation='right'
                                yAxisId='right'
                                className='yAxis'
                            >
                                <Label
                                    value='value_area'
                                    position='top'
                                    dy={-20}
                                    fontSize={14}
                                    className='xAxisLabel'
                                    fill={themeObject.areaStroke}
                                />
                            </YAxis>

                            <Legend
                                verticalAlign='top'
                                formatter={value => (
                                    <span
                                        ref={legendRef}
                                        style={{color: themeObject.textColorGrey}}
                                    >
                                        {value}
                                    </span>
                                )}
                                wrapperStyle={{
                                    paddingBottom: '20px',
                                }}
                            />

                            <Tooltip isAnimationActive={false} content={<CustomTooltip />} />

                            <CartesianGrid
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                ref={gridRef}
                                strokeDasharray='3 3'
                                stroke={themeObject.axisStroke}
                            />

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
                                yAxisId='left'
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
                                yAxisId='right'
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
                                        onWheel={e =>
                                            zoomInOrOut(e, idx, zoom.startIdx, zoom.endIdx)
                                        }
                                        onMouseMove={e => {
                                            isZoomModeActive && drawBox(e);
                                        }}
                                        onMouseDown={e => {
                                            isZoomModeActive && startDrawBox(e, idx);
                                        }}
                                        onMouseUp={() => {
                                            isZoomModeActive && endDrawBox(idx);
                                        }}
                                        // key={time}
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
                                y={500}
                                className='brush'
                                dataKey='time'
                                travellerWidth={10}
                                stroke={themeObject.textColorGrey}
                                height={40}
                                fill={
                                    themeMode === 'light'
                                        ? themeObject.textColorLight
                                        : themeObject.zoomInBoxBg
                                }
                                startIndex={zoom.startIdx}
                                endIndex={zoom.endIdx}
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
                                        yAxisId='left'
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
                                        yAxisId='right'
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

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
import {Dispatch, SetStateAction} from 'react';
import SelectedDot from './Custom/SelectedDot';
import CustomTooltip from './Custom/Tooltip';

interface ChartProps {
    data: ChartItem[];
    selectedKey: ChartSelectedKey;
    setSelectedKey: Dispatch<SetStateAction<ChartSelectedKey>>;
}

const Chart = ({data, selectedKey = null, setSelectedKey}: ChartProps) => {
    return (
        <ComposedChart width={1000} height={400} data={data} onClick={console.info}>
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
                dataKey='value_area'
                type='monotone'
                fill='url(#colorArea)'
                stroke='#ff6b39'
                yAxisId='left'
                dot={<SelectedDot selectedKey={selectedKey} />}
            />
            {data.map(data => {
                const {time, id} = data;
                return (
                    <ReferenceArea
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

            <Brush dataKey='time' travellerWidth={10} height={60} fill='#ffffff'>
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
                        dataKey='value_area'
                        type='monotone'
                        fill='#ff885c94'
                        stroke='#ff875c'
                        yAxisId='left'
                    />
                </ComposedChart>
            </Brush>
        </ComposedChart>
    );
};

export default Chart;

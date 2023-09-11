import {getSeoulInfo} from '../api/seoulInfo';
import useChart from '../hooks/useChart';
import useChartFilter from '../hooks/useChartFilter';
import {
    ComposedChart,
    Area,
    Brush,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    DotProps,
    TooltipProps,
    Cell,
    ReferenceArea,
} from 'recharts';

const Main = () => {
    const {data: chartData} = useChart(getSeoulInfo);
    const {selectedKey, filterOptions, setSelectedKey} = useChartFilter('id', chartData);

    return (
        <div>
            <h3>차트</h3>
            <ul>
                {filterOptions.map(option => (
                    <li
                        className={`${selectedKey === option && 'selected'}`}
                        key={option}
                        onClick={() => setSelectedKey(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
            <ComposedChart width={980} height={250} data={chartData} onClick={console.info}>
                <XAxis label='2023년' dataKey='time' />
                <YAxis yAxisId='left' />
                <YAxis yAxisId='right' orientation='right' />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Brush />

                <Bar dataKey='value_bar' fill='#82ca9d' barSize={20} yAxisId='right'>
                    {chartData.map((entry, index) => (
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
                    dot={<CustomDot selectedKey={selectedKey} />}
                />
                {chartData.map(data => {
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
            </ComposedChart>
        </div>
    );
};

export default Main;

interface CustomDotProps extends DotProps {
    selectedKey: string | number | null;
    payload?: any;
}

const CustomDot = ({cx, cy, selectedKey, payload}: CustomDotProps) => {
    const {id} = payload;

    if (id === selectedKey) {
        return <circle cx={cx} cy={cy} r={4} stroke='#ff6b39' strokeWidth='1' fill='white' />;
    }
    return <></>;
};

const CustomTooltip = ({active, payload}: TooltipProps<number, string>): JSX.Element | null => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        const {id, value_area, value_bar} = item;
        return (
            <div className='custom-tooltip'>
                <p className='id'>{`${id}`}</p>
                <p className='valueArea'>{`value_area: ${value_area}`}</p>
                <p className='valueBar'>{`value_bar: ${value_bar}`}</p>
            </div>
        );
    }

    return null;
};

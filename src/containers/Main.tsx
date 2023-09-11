import useChartFilter from '../hooks/controllers/useChartFilter';
import useSeoulData from '../hooks/controllers/useSeoulChart';
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
} from 'recharts';

const Main = () => {
    const {state: chartState} = useSeoulData();
    const {data: chartData} = chartState;

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
            <ComposedChart width={1920} height={250} data={chartData}>
                <XAxis label='2023년' dataKey='time' />
                <YAxis yAxisId='left' />
                <YAxis yAxisId='right' orientation='right' />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Brush />
                <defs>
                    <linearGradient id='colorBar' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#82ca9d' stopOpacity={1} />
                        <stop offset='95%' stopColor='#82ca9d' stopOpacity={0.4} />
                    </linearGradient>
                </defs>
                <Bar dataKey='value_bar' fill='#82ca9d' barSize={20} yAxisId='right'>
                    {chartData.map((entry, index) => (
                        <Cell
                            cursor='pointer'
                            fill={entry.id === selectedKey ? ' #01b07b' : 'url(#colorBar)'}
                            key={`cell-${index}`}
                            onClick={() => setSelectedKey(entry.id)}
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
        return <circle cx={cx} cy={cy} r={4} stroke='#ff6b39' stroke-width='1' fill='white' />;
    }
    return <></>;
};

const CustomTooltip = ({active, payload}: TooltipProps<number, string>): JSX.Element | null => {
    if (active && payload && payload.length) {
        return (
            <div className='custom-tooltip'>
                <p className='id'>{`${payload[0].payload.id}`}</p>
                <p className='valueArea'>{`value_area: ${payload[0].payload.value_area}`}</p>
                <p className='valueBar'>{`value_bar: ${payload[0].payload.value_bar}`}</p>
            </div>
        );
    }

    return null;
};

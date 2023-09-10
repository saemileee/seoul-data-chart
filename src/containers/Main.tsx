import useChartFilter from '../hooks/controllers/useChartFilter';
import useSeoulData from '../hooks/controllers/useSeoulChart';
import {
    ComposedChart,
    Area,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
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
                <XAxis dataKey='time' />
                <YAxis yAxisId='left' />
                <YAxis yAxisId='right' orientation='right' />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey='value_bar' opacity={0.8} barSize={20} fill='#9fd9ff' yAxisId='right'>
                    {chartData.map((entry, index) => (
                        <Cell
                            cursor='pointer'
                            fill={entry.id === selectedKey ? ' #1fa5ff' : ' #9fd9ff'}
                            key={`cell-${index}`}
                            onClick={() => setSelectedKey(entry.id)}
                        />
                    ))}
                </Bar>
                <Area
                    dataKey='value_area'
                    type='monotone'
                    fill='#ffab8fb8'
                    stroke='#f4a983'
                    yAxisId='left'
                />
            </ComposedChart>
        </div>
    );
};

export default Main;

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

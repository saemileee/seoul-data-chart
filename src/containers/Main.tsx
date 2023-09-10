import useSeoulData from '../hooks/controllers/useSeoulChart';
import {ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, Legend, TooltipProps} from 'recharts';

const Main = () => {
    const {state: chartState} = useSeoulData();
    const {data: chartData} = chartState;
    console.info(chartData);

    return (
        <div>
            <h3>차트</h3>
            <ComposedChart width={1920} height={250} data={chartData}>
                <XAxis dataKey='time' />
                <YAxis yAxisId='left' />
                <YAxis yAxisId='right' orientation='right' />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey='value_bar' barSize={20} fill='#19a1fb' yAxisId='right' />
                <Area
                    dataKey='value_area'
                    type='monotone'
                    fill='#ff7c50'
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

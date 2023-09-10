import useSeoulData from '../hooks/controllers/useSeoulChart';
import {ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts';

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
                <Tooltip />
                <Legend />
                <Bar dataKey='valueBar' barSize={20} fill='#19a1fb' yAxisId='right' />
                <Area
                    dataKey='valueArea'
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

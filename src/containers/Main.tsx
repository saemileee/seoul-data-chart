import {getSeoulInfo} from '../api/seoulInfo';
import Chart from '../components/Chart';
import ChartFilter from '../components/ChartFilter';
import useChart from '../hooks/useChart';
import useChartFilter from '../hooks/useChartFilter';
const Main = () => {
    const {data: chartData} = useChart(getSeoulInfo);
    const {selectedKey, filterOptions, setSelectedKey} = useChartFilter('id', chartData);

    return (
        <div>
            <h3>차트</h3>
            <ChartFilter
                selectedKey={selectedKey}
                setSelectedKey={setSelectedKey}
                filterOptions={filterOptions}
            />
            <Chart data={chartData} selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
        </div>
    );
};

export default Main;

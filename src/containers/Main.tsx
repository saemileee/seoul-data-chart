import {getSeoulInfo} from '../api/seoulInfo';
import Chart from '../components/Chart/Chart';
import ChartFilter from '../components/Chart/ChartFilter';
import useChart from '../hooks/useChart';
import useChartFilter from '../hooks/useChartFilter';
const Main = () => {
    const {data: chartData, isLoading, error} = useChart(getSeoulInfo);
    const {selectedKey, filterOptions, setSelectedKey} = useChartFilter('id', chartData);

    if (error) <div>차트를 불러오지 못했습니다.</div>;
    return (
        <div>
            <h3>차트</h3>
            {!isLoading && chartData.length > 0 && (
                <>
                    <ChartFilter
                        selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                        filterOptions={filterOptions}
                    />
                    <Chart
                        data={chartData}
                        selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                    />
                </>
            )}
        </div>
    );
};

export default Main;

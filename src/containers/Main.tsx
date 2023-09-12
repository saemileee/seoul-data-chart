import {getSeoulInfo} from '../api/seoulInfo';
import Chart from '../components/Chart/Chart';
import useChart from '../hooks/useChart';
import styled from 'styled-components';

const Main = () => {
    const {data: chartData, isLoading, error} = useChart(getSeoulInfo);

    if (error) <div>차트를 불러오지 못했습니다.</div>;
    return (
        <StyledContainer>
            <h3>시계열 차트</h3>
            {!isLoading && chartData.length > 0 && (
                <>
                    <Chart data={chartData} />
                </>
            )}
        </StyledContainer>
    );
};

export default Main;

const StyledContainer = styled.div``;

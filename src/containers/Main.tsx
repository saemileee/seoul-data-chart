import {getSeoulInfo} from '../api/seoulInfo';
import Chart from '../components/Chart/Chart';
import ThemeToggle from '../components/ThemeToggle';
import useChart from '../hooks/useChart';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';

const Main = () => {
    const {data: chartData, isLoading, error} = useChart(getSeoulInfo);
    const {toggleTheme, themeMode} = useTheme();

    if (error) <div>차트를 불러오지 못했습니다.</div>;
    return (
        <StyledContainer>
            <ThemeToggle toggle={toggleTheme} mode={themeMode} />
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

const StyledContainer = styled.div`
    box-sizing: border-box;
    margin: 50px 40px 0 40px;
    h3 {
        text-align: center;
        color: ${props => props.theme.textColorDefault};
    }
`;

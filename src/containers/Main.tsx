import Chart from '../components/Chart/Chart';
import useChart from '../hooks/useChart';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';
import LoadingSpinner from '../components/LoadingSpinner';

const Main = () => {
    const {toggleTheme, themeMode} = useTheme();
    const {chartData, isLoading, error} = useChart();

    if (error) <div>차트를 불러오지 못했습니다.</div>;
    return (
        <StyledContainer>
            <h3>서울 시 시간별 bar, area 수</h3>
            <StyledChartContainer>
                {isLoading && <LoadingSpinner />}
                {!isLoading && chartData.data.length > 0 && <Chart chartData={chartData} />}
                <ThemeToggle toggle={toggleTheme} mode={themeMode} />
            </StyledChartContainer>
        </StyledContainer>
    );
};

export default Main;
const StyledContainer = styled.div`
    h3 {
        text-align: center;
    }
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledChartContainer = styled.div`
    min-width: 320px;
    box-sizing: border-box;
    margin: 50px 40px 0 40px;
    padding: 25px 0 20px 0;
    margin-top: 32px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: ${props => props.theme.bgColor};
    box-shadow: 0 0 20px ${props => props.theme.boxShadow};
    h3 {
        text-align: center;
        color: ${props => props.theme.textColorDefault};
    }
`;

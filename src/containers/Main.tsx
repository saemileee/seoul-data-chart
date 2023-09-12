import {getSeoulInfo} from '../api/seoulInfo';
import Chart from '../components/Chart/Chart';
import useChart from '../hooks/useChart';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';
import React from 'react';

const Main = () => {
    const {toggleTheme, themeMode} = useTheme();
    const {chartData, isLoading, error} = useChart(getSeoulInfo);

    if (error) <div>차트를 불러오지 못했습니다.</div>;
    return (
        <StyledContainer>
            <h3>시계열 차트</h3>
            {!isLoading && chartData.data.length > 0 && <Chart chartData={chartData} />}
            <ThemeToggle toggle={toggleTheme} mode={themeMode} />
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

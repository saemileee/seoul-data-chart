const extractCommonTime = (data: string[]) => {
    // 첫 번째 데이터를 기준으로 공통 부분을 초기화
    let commonPrefix = data[0];

    // 공통 부분을 찾기 위해 다른 데이터와 비교
    for (const dateStr of data) {
        let i = 0;
        while (i < commonPrefix.length && i < dateStr.length && commonPrefix[i] === dateStr[i]) {
            i++;
        }
        // 현재 데이터와 기존 공통 부분을 비교하여 더 작은 부분을 새로운 공통 부분으로 설정
        commonPrefix = commonPrefix.slice(0, i);
    }

    return commonPrefix;
};

export default extractCommonTime;

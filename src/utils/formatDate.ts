const formatDate = (inputDateStr: string) => {
    // 주어진 날짜 데이터를 Date 객체로 파싱
    const date = new Date(inputDateStr);

    // 시, 분, 초 추출
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let formattedDate = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        // 시간, 분, 초가 모두 0일 경우
        formattedDate += ` ${hours}시`;
    } else if (minutes === 0) {
        // 초만 0일 경우
        formattedDate += ` ${hours}시`;
    } else if (seconds === 0) {
        // 초만 0일 경우
        formattedDate += ` ${hours}시 ${minutes}분`;
    } else {
        formattedDate += ` ${hours}시 ${minutes}분 ${seconds}초`;
    }

    return formattedDate;
};

export default formatDate;

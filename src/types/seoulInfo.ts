export interface AreaInfo {
    id: string;
    value_area: number;
    value_bar: number;
}

export interface ResponseData {
    [timestamp: string]: AreaInfo;
}

export interface SeoulInfoChartItem {
    id: string;
    time: string;
    value_area: number;
    value_bar: number;
}

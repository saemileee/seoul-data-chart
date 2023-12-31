export interface AreaInfo {
    id: string;
    value_area: number;
    value_bar: number;
}

export interface ResponseData {
    [timestamp: string]: AreaInfo;
}

export interface ChartItem {
    id: string;
    time: string;
    value_area: number;
    value_bar: number;
}

export interface ChartData {
    commonTime: string;
    data: ChartItem[];
}

export type ChartSelectedKey = string | number;

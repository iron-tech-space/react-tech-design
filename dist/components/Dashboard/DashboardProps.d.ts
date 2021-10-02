import { Request } from "../core/interfaces";
export interface DashboardPanelProps {
    size: any;
    title: string;
    type: string;
    params: object | undefined;
    gridPos: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}
export interface DashboardGridProps {
    size: any;
    panels: DashboardPanelProps[] | undefined;
}
export interface DashboardProps {
    id: string;
    requestLoadConfig: Request;
    dashboard: any;
}
export interface LogsPanelProps {
    loki: {
        url: string;
        query: string;
    };
}

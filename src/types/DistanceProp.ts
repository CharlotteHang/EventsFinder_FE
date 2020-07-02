export interface DistanceProp {
    startDistance: number;
    endDistance: number;
    handleDistanceChange: (event: any, newValue: number | number[]) => void;
    clearDistance: () => (event: React.MouseEvent<unknown>) => void;
}
export type DragLimits = [
    [number, number] | undefined,
    [number, number] | undefined,
    [number, number] | undefined,
];
export type DragConfig = {
    dragLimits?: DragLimits;
};

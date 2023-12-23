import { DragComponentProps } from "@/types";
import { CSSProperties } from "react";

export interface SVProps extends Omit<DragComponentProps, 'dir'> {
    className?: string;
    style?: CSSProperties;
}
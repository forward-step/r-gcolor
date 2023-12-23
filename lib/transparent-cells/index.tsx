import { bem } from 'bem2';
import { CSSProperties } from 'react';
import './index.scss';

export interface TransparentCellsProps {
    className?: string;
    style?: CSSProperties;
    background?: string;
}

const { emsc, ec } = bem('transparent-cells');

export function TransparentCells({ background, className, style }: TransparentCellsProps) {
    return (
        <div className={ec(null, [className])} style={style}>
            <span className={emsc('cells')}></span>
            {!!background ? <span style={{ background }}></span> : null}
        </div>
    );
}

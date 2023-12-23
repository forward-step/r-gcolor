import { useMemo } from 'react';
import Draggable from '@/draggable';
import { bem } from 'bem2';
import { formatNumber } from '@/utils';
import './index.scss';
import { Dir, HEIGHT, WIDTH } from '@/config';
import { TransparentCells } from '@/transparent-cells';
import Color from 'color';
import { AlphaProps } from './interface';
import { useCoord } from '@/hooks';

export * from './interface';

const { emsc } = bem('alpha');

export function Alpha({
    className,
    style,
    value,
    onChange,
    dir = Dir.horizontal,
    width = WIDTH,
    height = HEIGHT,
    pointer,
}: AlphaProps) {
    const dragOptions = useCoord({
        dir,
        value,
        onChange(color, precent) {
            onChange?.(color.alpha(formatNumber(precent, 2)));
        },
        updatePositionX(color) {
            return color.alpha();
        },
        updatePositionY(color) {
            return color.alpha();
        },
    });
    const alphaCSSValue = useMemo(() => {
        if (!value) return '';
        const alpha0 = Color(value).alpha(0).toString();
        const alpha1 = Color(value).alpha(1).toString();
        return `linear-gradient(${
            dir === 'horizontal' ? 'to right' : 'to bottom'
        }, ${alpha0} 0%, ${alpha1} 100%)`;
    }, [value, dir]);

    return (
        <Draggable
            className={emsc(null, dir, null, className)}
            style={{ width, height, ...style }}
            pointer={pointer || <span className={emsc('thumb', dir)}></span>}
            {...dragOptions}
        >
            <TransparentCells background={alphaCSSValue}></TransparentCells>
        </Draggable>
    );
}

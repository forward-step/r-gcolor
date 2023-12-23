import { useMemo } from 'react';
import Draggable from '@/draggable';
import { bem } from 'bem2';
import Color from 'color';
import { SVProps } from './interface';
import { useCoord } from '@/hooks';
import './index.scss';

export * from './interface';

const { emsc, ec } = bem('sv-panel');
const SaturationRange = [0, 100];
const ValueRange = [0, 100];

export function SVPanel({
    className,
    style,
    value,
    onChange,
    width = 280,
    height = 180,
    pointer,
}: SVProps) {
    const backgroundColor = useMemo(() => {
        if (!value) return '';
        return Color(value)
            .saturationv(SaturationRange[1])
            .value(ValueRange[1])
            .alpha(1)
            .toString();
    }, [value]);
    const drgaOptions = useCoord({
        dir: 'all',
        value,
        onChange(color, _, { precentX, precentY }) {
            onChange?.(
                color
                    .value((1 - precentY) * ValueRange[1])
                    .saturationv(precentX * SaturationRange[1])
            );
        },
        updatePositionX(color) {
            return color.saturationv() / SaturationRange[1];
        },
        updatePositionY(color) {
            return 1 - color.value() / ValueRange[1];
        },
    });

    return (
        <Draggable
            className={ec(null, className)}
            style={{
                backgroundColor,
                width,
                height,
                ...style,
            }}
            pointer={pointer || <span className={emsc('thumb')}></span>}
            {...drgaOptions}
        />
    );
}

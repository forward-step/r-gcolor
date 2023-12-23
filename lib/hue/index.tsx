import Draggable from '@/draggable';
import { bem } from 'bem2';
import { formatNumber } from '../utils';
import { Dir, HEIGHT, WIDTH } from '@/config';
import { HueProps } from './interface';
import { useCoord } from '@/hooks';
import './index.scss';

export * from './interface';

const { emsc } = bem('hue');
const HueRange = [0, 359];

export function Hue({
    className,
    style,
    value,
    onChange,
    dir = Dir.horizontal,
    width = WIDTH,
    height = HEIGHT,
    pointer,
}: HueProps) {
    const dragOptions = useCoord({
        dir,
        value,
        onChange(color, precent) {
            onChange?.(color.hue(formatNumber(precent * HueRange[1], 0)));
        },
        updatePositionX(color) {
            return color.hue() / HueRange[1];
        },
        updatePositionY(color) {
            return color.hue() / HueRange[1];
        },
    });

    return (
        <Draggable
            className={emsc(null, dir, null, className)}
            style={{ width, height, ...style }}
            pointer={pointer || <span className={emsc('thumb', dir)}></span>}
            {...dragOptions}
        />
    );
}

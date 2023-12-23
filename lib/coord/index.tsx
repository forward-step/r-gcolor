import { default_coord_x, default_coord_y } from '@/config';
import Draggable from '@/draggable';
import { InputNumber } from '@/input-number';
import { formatNumber, range } from '@/utils';
import { bem } from 'bem2';
import { CoordProps } from './interface';
import { useCoord } from '@/hooks';
import './index.scss';

export * from './interface';

const { emsc, ec } = bem('coord');

const format = (val: number) => range(formatNumber(val, 2), [0, 1]);
const COORD_UNIT = '%';
const COORD_STEP = 1;
const MIN_VALUE = 0;
const MAX_VALUE = 100;

export function Coord({ className, style, x, y, pointer, onChange, xInput, yInput }: CoordProps) {
    const drgaOptions = useCoord({
        dir: 'all',
        value: undefined,
        onChange(_, __, { precentX, precentY }) {
            onChange?.({
                x: format(precentX),
                y: format(precentY),
            });
        },
        updatePositionX() {
            return typeof x === 'number' ? format(x) : default_coord_x;
        },
        updatePositionY() {
            return typeof y === 'number' ? format(y) : default_coord_y;
        },
    });

    const xValue = formatNumber((x ?? default_coord_x) * 100, 0);
    const yValue = formatNumber((y ?? default_coord_y) * 100, 0);
    const handleXChange = (val: number) => {
        onChange?.({
            x: format(val / 100),
            y: format(y ?? default_coord_y),
        });
    };
    const handleYChange = (val: number) => {
        onChange?.({
            x: format(x ?? default_coord_x),
            y: format(val / 100),
        });
    };

    return (
        <div className={ec(null)}>
            <Draggable
                className={ec('stage', className)}
                style={style}
                pointer={pointer || <span className={emsc('thumb')}></span>}
                {...drgaOptions}
            />

            <div className={ec('row')}>
                {xInput ? (
                    xInput({
                        value: xValue,
                        onChange: handleXChange,
                        min: MIN_VALUE,
                        max: MAX_VALUE,
                        step: COORD_STEP,
                    })
                ) : (
                    <InputNumber
                        value={xValue}
                        onChange={handleXChange}
                        unit={COORD_UNIT}
                        step={COORD_STEP}
                    />
                )}
                {yInput ? (
                    yInput({
                        value: yValue,
                        onChange: handleYChange,
                        min: MIN_VALUE,
                        max: MAX_VALUE,
                        step: COORD_STEP,
                    })
                ) : (
                    <InputNumber
                        value={yValue}
                        onChange={handleYChange}
                        unit={COORD_UNIT}
                        step={COORD_STEP}
                    />
                )}
            </div>
        </div>
    );
}

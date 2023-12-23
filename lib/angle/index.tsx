import { bem } from 'bem2';
import { FC } from 'react';
import Draggable, { DraggableChange } from '@/draggable';
import { range, rad2deg } from '@/utils';
import type { AngleInputProps, AngleProps } from './interface';
import './index.scss';
import { InputNumber } from '@/input-number';

export * from './interface';

const { emsc, ec } = bem('angle');

const MIN_ANGLE = 0;
const MAX_ANGLE = 359;
const ANGLE_STEP = 1;
const ANGLE_UNIT = 'deg';

export const Angle: FC<AngleProps> = ({
    className,
    angleStyle,
    value,
    onChange,
    input = true,
    formatAngle = Math.round,
    pointer,
}) => {
    const innerValue = formatAngle(value ?? 0);
    const innerOnChange = (val: number) => {
        onChange?.(formatAngle(range(val, [MIN_ANGLE, MAX_ANGLE], true)));
    };

    /**
     * (width/2,height)
     * _________ (x, y)
     * |       /
     * |      /
     * |     /
     * |    /
     * |   /
     * |  /
     * | /
     * |/
     * (width/2, height/2)
     */
    const handleChange: DraggableChange = ({ x, y, width, height }) => {
        let deg: number;
        const opposite = x - width / 2; // 对边长度
        const adjacent = height / 2 - y; // 邻边长度
        /**
         *      对边    邻边
         * 一     +     +
         * 二     +     -
         * 三     -     -
         * 四     -     +
         */
        if (opposite === 0 && adjacent === 0) {
            return;
        }
        if (opposite === 0) {
            if (adjacent > 0) {
                deg = 0;
            } else {
                deg = 180;
            }
        } else if (adjacent === 0) {
            if (opposite > 0) {
                deg = 90;
            } else {
                deg = 270;
            }
        } else {
            deg = rad2deg(Math.abs(Math.atan(opposite / adjacent)));
            if (opposite > 0) {
                if (adjacent > 0) {
                    deg += 0;
                } else {
                    deg = 180 - deg;
                }
            } else {
                if (adjacent < 0) {
                    deg += 180;
                } else {
                    deg = 360 - deg;
                }
            }
        }
        innerOnChange?.(deg);
    };

    let inputWidget = null;
    const input_props: AngleInputProps = {
        value: innerValue,
        onChange: innerOnChange,
        unit: ANGLE_UNIT,
        min: MIN_ANGLE,
        max: MAX_ANGLE,
        step: ANGLE_STEP,
    };
    if (input == true) {
        inputWidget = <InputNumber {...input_props} loop />;
    } else if (typeof input === 'function') {
        inputWidget = input(input_props);
    }

    return (
        <div className={emsc()}>
            <Draggable
                className={ec('wrapper', className)}
                style={angleStyle}
                onChange={handleChange}
                pointerStyle={{
                    width: '100%',
                    height: '100%',
                    transform: `rotate(${innerValue}${ANGLE_UNIT})`,
                }}
                pointer={pointer || <span className={emsc('pointer')}></span>}
            />
            {inputWidget}
        </div>
    );
};

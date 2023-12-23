import { formatNumber, range } from '@/utils';
import { bem } from 'bem2';
import { FC, useEffect, useState, WheelEvent } from 'react';
import type { InputNumberProps } from './interface';
import './index.scss';

export * from './interface';

const { emsc } = bem('input');

export const InputNumber: FC<InputNumberProps> = ({
    value,
    onChange,
    unit = '',
    min = -Infinity,
    max = Infinity,
    step = 1,
    decimalPlaces = 0,
    enabledWheel = true,
    loop = false,
}) => {
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        if (typeof value === 'number') {
            setInputValue(formatNumber(value, decimalPlaces) + unit);
        }
    }, [value, unit]);

    const submit = (defalutValue?: string | number) => {
        const value = range(parseFloat(defalutValue?.toString() ?? inputValue), [min, max], loop);
        if (Number.isNaN(value)) return;
        else onChange?.(value);
    };

    /// 实现鼠标滚动自增、自减
    const [isFocus, setIsFocus] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
        if (!isFocus || !isHover || !enabledWheel) return;
        const incr = e.deltaY < 0;
        if (incr) submit(parseFloat(inputValue) + step);
        else submit(parseFloat(inputValue) - step);
    };
    return (
        <input
            className={emsc()}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
                setIsFocus(false);
                submit();
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onKeyDown={e => {
                if (e.key === 'Enter') submit();
            }}
            onWheel={handleWheel}
        />
    );
};

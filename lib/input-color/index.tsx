import Color from 'color';
import { forwardRef, useEffect, useState } from 'react';
import { InputColorProps } from './interface';
import { bem } from 'bem2';
import './index.scss';
import { formatterColor } from '@/utils';
import { COLOR_FORMAT } from '@/config';

export * from './interface';

const { emsc, ec } = bem('input-color');

export const InputColor = forwardRef<HTMLInputElement, InputColorProps>(
    (
        {
            value,
            onChange,
            defaultFormat = COLOR_FORMAT.RGB,
            select = true,
            wrapperClassName,
            wrapperStyle,
            className,
            style,
        },
        ref
    ) => {
        const [formatType, setFormatType] = useState(defaultFormat);
        const [inputValue, setInputValue] = useState('');
        useEffect(() => {
            if (!!value) {
                setInputValue(formatterColor(value, formatType));
            }
        }, [value, formatType]);

        const submit = () => {
            try {
                const color = Color(inputValue);
                onChange?.(color);
            } catch (e) {}
        };

        return (
            <div className={ec(null, wrapperClassName)} style={wrapperStyle}>
                {select === true ? (
                    <select
                        className={emsc('select')}
                        value={formatType}
                        onChange={e => {
                            setFormatType(e.target.value as COLOR_FORMAT);
                        }}
                    >
                        <option value={COLOR_FORMAT.HEX} label={COLOR_FORMAT.HEX}></option>
                        <option value={COLOR_FORMAT.RGB} label={COLOR_FORMAT.RGB}></option>
                        <option value={COLOR_FORMAT.HSL} label={COLOR_FORMAT.HSL}></option>
                    </select>
                ) : typeof select === 'function' ? (
                    select({ value: formatType, onChange: setFormatType })
                ) : null}
                <input
                    className={ec('input', className)}
                    style={style}
                    type="text"
                    ref={ref}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onBlur={() => submit()}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.code === 'Enter') submit();
                    }}
                />
            </div>
        );
    }
);

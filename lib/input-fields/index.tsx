import { CSSProperties, PropsWithChildren, useMemo } from 'react';
import { bem } from 'bem2';
import { InputNumber } from '../input-number';
import { InputColor } from '../input-color';
import { InputFieldsProps } from './interface';
import Color from 'color';
import './index.scss';
import { COLOR_FORMAT } from '@/config';

export * from './interface';

const { ec, emsc } = bem('input-fields');

const Row = ({
    title,
    children,
    style,
}: PropsWithChildren<{ title: string; style?: CSSProperties }>) => {
    return (
        <div className={emsc('row')} style={style}>
            {children}
            <span className={emsc('text')}>{title}</span>
        </div>
    );
};

const inputNumberConfig = {
    min: 0,
    max: 255,
    step: 1,
};

export function InputFields({ className, style, value, onChange }: InputFieldsProps) {
    const { color, hex, r, g, b, a } = useMemo(() => {
        const color = Color(value);
        return {
            color,
            hex: color.hex(),
            r: color.red(),
            g: color.green(),
            b: color.blue(),
            a: color.alpha() * 100,
        };
    }, [value]);
    return (
        <div className={ec(null, className)} style={style}>
            <Row title="Hex" style={{ flexGrow: 2 }}>
                <InputColor
                    value={hex}
                    defaultFormat={COLOR_FORMAT.HEX}
                    onChange={val => onChange?.(val)}
                    select={false}
                />
            </Row>
            <Row title="R">
                <InputNumber
                    value={r}
                    onChange={val => onChange?.(color.red(val))}
                    {...inputNumberConfig}
                />
            </Row>
            <Row title="G">
                <InputNumber
                    value={g}
                    onChange={val => onChange?.(color.green(val))}
                    {...inputNumberConfig}
                />
            </Row>
            <Row title="B">
                <InputNumber
                    value={b}
                    onChange={val => onChange?.(color.blue(val))}
                    {...inputNumberConfig}
                />
            </Row>
            <Row title="A">
                <InputNumber
                    value={a}
                    onChange={val => onChange?.(color.alpha(val / 100))}
                    {...inputNumberConfig}
                />
            </Row>
        </div>
    );
}

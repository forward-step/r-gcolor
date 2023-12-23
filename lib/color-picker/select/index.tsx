import { bem } from 'bem2';
import { ColorPickerSelectProps } from '../interface';
import './index.scss';

const { emsc } = bem('color-picker-select');

export function Select({ value, onChange, options }: ColorPickerSelectProps) {
    return (
        <select className={emsc()} value={value} onChange={e => onChange?.(e.target.value as any)}>
            {options.map(item => (
                <option key={item.value} label={item.label} value={item.value}></option>
            ))}
        </select>
    );
}

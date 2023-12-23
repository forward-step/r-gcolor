import { useMemo } from 'react';
import { bem } from 'bem2';
import './index.scss';
import { SingleColorPicker } from '@/types';
import { Dir, SINGLE_PICKER_CLSNAME } from '@/config';
import { Hue } from '@/hue';
import { Alpha } from '@/alpha';
import { SVPanel } from '@/sv-panel';
import { TransparentCells } from '@/transparent-cells';

const { emsc, ec } = bem('sketch-picker');

export function SketchPicker({
    value,
    onChange,
    suffix,
    prefix,
    className,
    style,
}: SingleColorPicker) {
    const changeValueProps = { value, onChange };

    const background = useMemo(() => {
        if (!value) return '';
        return value.toString();
    }, [value]);

    return (
        <div className={ec(null, [SINGLE_PICKER_CLSNAME, className])} style={style}>
            {typeof prefix === 'function' ? prefix?.(changeValueProps) : prefix}
            <SVPanel {...changeValueProps} width="100%" height={150} />
            <div className={emsc('ha')}>
                <Hue dir={Dir.horizontal} {...changeValueProps} width="100%" height="100%" />
                <span className={emsc('preview')}>
                    <TransparentCells background={background}></TransparentCells>
                </span>
                <Alpha dir={Dir.horizontal} {...changeValueProps} width="100%" height="100%" />
            </div>
            {typeof suffix === 'function' ? suffix?.(changeValueProps) : suffix}
        </div>
    );
}

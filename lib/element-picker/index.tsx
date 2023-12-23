import { bem } from 'bem2';
import { Hue } from '@/hue';
import { Alpha } from '@/alpha';
import { SVPanel } from '@/sv-panel';
import { SingleColorPicker } from '@/types';
import { Dir, SINGLE_PICKER_CLSNAME } from '@/config';
import './index.scss';

const { emsc, ec } = bem('element-picker');

export function ElementPicker({
    value,
    onChange,
    suffix,
    prefix,
    className,
    style,
}: SingleColorPicker) {
    const changeValueProps = { value, onChange };
    return (
        <div className={ec(null, [SINGLE_PICKER_CLSNAME, className])} style={style}>
            {typeof prefix === 'function' ? prefix?.(changeValueProps) : prefix}
            <div className={emsc('container')}>
                <SVPanel {...changeValueProps} />
                <Hue {...changeValueProps} dir={Dir.vertical} width="100%" height="100%" />
                <Alpha {...changeValueProps} dir={Dir.horizontal} width="100%" height="100%" />
            </div>
            {typeof suffix === 'function' ? suffix?.(changeValueProps) : suffix}
        </div>
    );
}

export function range(value: number, [min, max]: [number, number], loop: boolean = false) {
    let res = value;
    if (loop) {
        if (value > max) res = min;
        else if (value < min) res = max;
        return res;
    }
    return Math.max(Math.min(value, max), min);
}

export function overflow(value: number, [min, max]: [number, number]): boolean {
    if (value < min || value > max) return true;
    return false;
}

export function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

export function rad2deg(rad: number) {
    return rad * (180 / Math.PI);
}

export function isFunction(func: any): func is Function {
    return typeof func === 'function';
}

export function formatNumber(num: number, decimalPlaces: number) {
    return Number(num.toFixed(decimalPlaces));
}

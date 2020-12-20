export let linear = v => v;

export function cubicBezier(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6;

    const ax = 3 * p1x - 3 * p2x + 1;
    const bx = 3 * p2x - 6 * p1x;
    const cx = 3 * p1x;

    const ay = 3 * p1y - 3 * p2y + 1;
    const by = 3 * p2y - 6 * p1y;
    const cy = 3 * p1y;

    function sampleCurveBerivativeX(t) {
        return (3 * ax * t + 2 * bx) * t + cx;
    }

    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx) * t;
    }

    function solveCurveX(x) {
        var t2 = x;
        var derivative;
        var x2;

        for (let i = 0; i < 8; i++) {

            x2 = sampleCurveX(t2) - x;

            if (Math.abs(t2) < ZERO_LIMIT) {
                return t2;
            }

            derivative = sampleCurveBerivativeX(t2);
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }

            t2 -= x2 / derivative;
        }

        var t1 = 1;
        var t0 = 0;

        t2 = x;

        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }

            if (x2 > 0) {
                t1 = t2;
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }

        return t2;
    }

    function solve(x) {
        return sampleCurveX(solveCurveX(x));
    }

    return solve;
}

export let ease = cubicBezier(0.25, 0.1, 0.25, 1);
export let easeIn = cubicBezier(0.42, 0, 1, 1);
export let easeOut = cubicBezier(0, 0, 0.58, 1);
export let easeInOut = cubicBezier(0.42, 0, 0.58, 1);
export const base64ToUtf8 = (base64Str_b) => {
    // create a buffer
    const _buff = Buffer.from(base64Str_b, 'base64');

    // decode buffer as UTF-8
    const _utf8Str = _buff.toString('utf-8');

    return _utf8Str;
}

export const milliSecToStr = (milliSec_m) => {
    let day, hour, min, sec;
    sec = parseInt((milliSec_m / 1000) % 60);
    min = parseInt((milliSec_m / 1000 / 60) % 60);
    hour = parseInt((milliSec_m / 1000 / 60 / 60) % 24);
    day = parseInt(milliSec_m / 1000 / 60 / 60 / 24);

    return {
        day: day,
        hour: hour,
        min: min,
        sec: sec,
    };
}
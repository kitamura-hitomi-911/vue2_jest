/**
 * 日時フォーマット
 * @param { Date | string | number} date フォーマットしたい日時情報
 * @param format
 * @returns {*}
 */
export function formatDate (date, format) {
    if(isString(date)){
        date = new Date(date.replace(/-/g,'/'));
    }else if(isNumber(date)){
        date = new Date(date);
    }
    if(!format) format = window.date_format ? window.date_format : 'YYYY年MM月DD日(WD)';
    const weekdaylist = ["日", "月", "火", "水", "木", "金", "土"];
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/WD/g, weekdaylist[date.getDay()]);
    format = format.replace(/_M_/g, date.getMonth() + 1 * 1);
    format = format.replace(/_D_/g, date.getDate());
    format = format.replace(/_h_/g, date.getHours());
    format = format.replace(/_m_/g, date.getMinutes());
    format = format.replace(/_s_/g, date.getSeconds());
    if(format.match(/_S_/g)){
        const milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
        const length = format.match(/S/g).length;
        for(var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
}

/**
 * 文字列か否か
 * @param tgt
 * @returns {boolean}
 */
export function isString(tgt){
    return typeof (tgt) === "string" || tgt instanceof String;
}

/**
 * 数値か否か（null と Infinity は数値扱いしない）
 * @param tgt
 * @returns {boolean}
 */
export function isNumber(tgt){
    return tgt !== null && isFinite(tgt);
}
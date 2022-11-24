// 时间格式转换
const useTimeCycle = (time, timeFormatType, timeSeparator) => {
    if (!time) {
        console.error("time参数错误")
        return;
    }
    if (timeFormatType && typeof timeFormatType !== 'string') {
        console.error(
            "timeFormatType类型有误，请从'year|month|date|hour|minutes|second|ChineseCharacters'选择，或不传此参数，不传默认为second"
        )
        return;
    }
    const date = new Date(time.length <= 10 ? time * 1000 : time);
    return timeGranularity(date, timeFormatType || 'second', timeSeparator || '-');
};
const timeGranularity = (date, timeFormatType, timeSeparator) => {
    const Y = date.getFullYear();
    const M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const D = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
    const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    const timeMap = new Map()
        .set('year', Y)
        .set('month', M)
        .set('date', D)
        .set('hour', h)
        .set('minutes', m)
        .set('second', s);
    let specifiedTimeFormat = "";
    if (timeFormatType === 'ChineseCharacters') return `${Y}年${M}月${D}日 ${h}时${m}分${s}秒`;
    let timeKey = null;
    let dateArr = [];
    let timeArr = [];
    timeMap.forEach((value, key, map) => {
        if (timeKey && timeKey == timeFormatType) return false;
        timeKey = key === timeFormatType ? key : null
        if (dateArr.length < 3) {
            dateArr.push(value)
        } else {
            timeArr.push(value)
        }
    })
    specifiedTimeFormat = `${dateArr.join(timeSeparator)} ${timeArr.join(':')}`
    return specifiedTimeFormat;
};
export default useTimeCycle
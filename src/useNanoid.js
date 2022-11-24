//批量生成唯一id
import { nanoid } from "nanoid"
const useNanoid = (length = 1) => {
    const reg = /^[1-9]+[0-9]*]*$/;
    if (!reg.test(length)) {
        console.error("请传入生成条数，最小条数为一条，不传则默认为一条！")
        return
    }
    if (parseInt(length) === 1) {
        // 生成一条的情况下，直接返回id，不返回数组形式
        return nanoid()
    }
    let nanoidList = []
    for (let i = 0; i < length; i++) {
        nanoidList.push(nanoid())
    }
    return nanoidList
}
export default useNanoid

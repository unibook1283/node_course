const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative')
            }
            resolve(a + b)
        }, 2000)
    })
}

// const doWork = async () => {    // async function always returns 'promise'!
//     throw new Error('Something went wrong')
//     return 'Andrew'
// }

const doWork = async () => {
    const sum = await add(1, -99)       // 여기서 문제 생기면 아래는 실행되지 않음
    const sum2 = await add(sum, 50)
    const sum3 = await add(sum2, -3)
    return sum3
}
// 장점
// 1. 간결하다
// 2. async로 받아온 값들을 same scope에서 다 쓸 수 있다

doWork().then((result) => {
    console.log('result', result)
}).catch((e) => {
    console.log('e', e)
})
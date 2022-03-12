const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

// test('Hello world!', () => {    // error를 return하면 fail. 안하면 success.

// })

// test('This should fail', () => {
//     throw new Error('Failure!')
// })

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)

    expect(total).toBe(13)  // 아래랑 같은 동작.
    // if (total !== 13) {
    //     throw new Error('Total tip should be 13. Got ' + total)
    // }
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should convert 32 F to 0 C', () => {
    const result = fahrenheitToCelsius(32)
    expect(result).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    const result = celsiusToFahrenheit(0)
    expect(result).toBe(32)
})

// test('Async test demo', (done) => {     // callback function에 parameter를 넣어줘야 async인걸 안다
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()  // async process가 끝났음을 알림
//     }, 2000)
// })

test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

// 이게 낫다
test('Should add two numbers async/await', async () => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})
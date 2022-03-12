setTimeout(() => {
    console.log('Two seconds are up')
}, 2000)

const names = ['Andrew', 'Jen', 'Jess']
const shortNames = names.filter((name) => {
    return name.length <= 4
})

// 1번

// const geocode = (address, callback) => {
//     const data = {
//         latitude: 0,
//         longitude: 0
//     }
//     return data
// }
// const data = geocode('Philadelphia')
// console.log(data)
// 이건 Okay  { latitude: 0, longitude: 0 }



// 2번

// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude: 0
//         }
//         return data
//     }, 2000)
// }
// const data = geocode('Philadelphia')
// console.log(data)
// 함수 안에 asynchronous가 있는 경우
// 이건 geocode라는 함수가 return을 하고 있지 않아서 undefined가 출력됨
// call stack 배운거랑 연관지어서 생각해봐



// 3번

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        callback(data)
    }, 2000)
}
const data = geocode('Philadelphia', (data) => {
    console.log(data)
})



// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})





const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error!', undefined)
        callback(undefined, [1, 4, 7])
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error)
    }

    console.log(result)
})
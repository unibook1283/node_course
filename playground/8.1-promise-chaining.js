const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

add(1, 2).then((sum) => {   // 이렇게 하면 되긴 하지만 복잡하고 nested
    console.log(sum)        // catch를 불필요하게 두 번이나 쓴다

    add(sum, 5).then((sum2) => {
        console.log(sum2)
    }).catch((e) => {
        console.log(e)
    })
}).catch((e) => {
    console.log(e)
})

add(1, 1).then((sum) => {
    console.log(sum)
    return add(sum, 4)  // 여기서 return한 promise를
}).then((sum2) => {     // 여기서 .then으로 다시 받는다
    console.log(sum2)
}).catch((e) => {
    console.log(e)
})
const doWorkPromise = new Promise((resolve, reject) => {    // function 두 개 resolve, reject
    setTimeout(() => {                                      // 함수 이름부터가 뭐가 성공한거고 실패한건지 알 수 있다. callback에 비해
        // resolve([7, 4, 1])
        reject('Things went wrong!')
        // resolve([2, 3, 2])
        reject('New Error!')
    }, 2000)
})
// resolve를 여러번 할 수 있는 장점이 있다.
doWorkPromise.then((result) => {  // resolve에서 보내준 것을 .then의 callback function에서 인자로 받을 수 있다.
    console.log('Success!', result)
}).catch((error) => {
    console.log(error)
})
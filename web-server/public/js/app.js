// fetch API는 part of JavaScript가 아니고 browser based API라서 nodejs에선 쓸 수 없다.
// This script is running in client side JavaScript, so using the Fetch API is perfectly fine.


// querySelector: hbs에서 인자로 받은 form을 찾는데 맨 처음 만난 애만 적용된다.
// 그래서 원하는 애가 맨 위에 오도록 하던가 hbs 파일에서 그 tag에 id를 주던가 하면 됨
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  // 새로고침 등 default로 실행하는 걸 막는다

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })
})
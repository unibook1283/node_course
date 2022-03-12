// Object property shorthand

const name = 'Andrew'
const userAge = 27

const user = {
    // name: name, // key, value 이름이 같을 땐 아래처럼 줄일 수 있다.
    name,
    age: userAge,
    location: 'Philadelphia'
}

console.log(user)

// Object destructuring
// : extracting properties easily
// 아! react에서 import {} from ''도 이거구나! 아닌가?

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const label = product.label
// const stock = product.stock
// 이거를 아래처럼 간단히 할 수 있다.

const {label: productLabel, stock, rating = 5} = product    //productLabel처럼 다른 이름으로 저장할 수 있다.
console.log(productLabel)
console.log(stock)
console.log(rating) // 없는 변수는 undefined가 나온다. 위에서 5로 default값을 잡아줬음.
                    // default값은 property가 없을 때만 입력된다.

// const transaction = (type, myProduct) => {
//     const { label, stock } = myProduct
//     console.log(type, label, stock)
// }
// 이렇게 할 수 있는데, 더 간단히 아래처럼
const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock)
}

transaction('order', product)
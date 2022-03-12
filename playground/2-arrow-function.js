// const square = function (x) {
//     return x * x
// }

// const square = (x) => {
//     return x * x
// }

// const square = (x) => x * x

// console.log(square(3))

const event = {
    name: 'Birthday Party',
    guestList:  ['Andrew', 'Jen', 'Mike'],
    printGuestList1() {
        console.log(`Guest list for ${this.name}`)
        
        this.guestList.forEach((guest) => {
            console.log(`${guest} is attending ${this.name}`)
        })
    },
    printGuestList: () => {
        console.log(`Guest list for ${this.name}`)
    }   // arrow function으로 this를 쓰면 undefined가 나온다
}       // this 쓸 때는 arrow function 쓰면 안됨 (binding...?)

event.printGuestList1()
event.printGuestList()
//
// Goal: Create method to get incomplete tasks
//
// 1. Define getTasksToDo method
// 2. Use filter to to return just the incompleted tasks (arrow function)
// 3. Test your work by running the script

const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    getTasksToDo() {
        console.log(this)
        return this.tasks.filter((task) => !task.completed )    // 화살표 함수를 쓰면 상위 거를 this로 갖는다
    },

    // 화살표 함수를 쓰면 상위 거를 this로 갖는다

    // getTasksToDo1: () => {   // 얘는 안된다! TypeError: Cannot read property 'filter' of undefined
    //     console.log(this)    // 윗줄을 저렇게 arrow function 쓰면 여기 this가 tasks가 아니고 window가 됨
    //     return this.tasks.filter((task) => !task.completed )
    // },

    // getTasksToDo2() {
    //     console.log(this)
    //     return this.tasks.filter((task) => {
    //         console.log(this)
    //         return !task.completed
    //     })    // 화살표 함수를 쓰면 상위 거를 this로 갖는다
    // },

    // getTasksToDo3() {
    //     console.log(this)
    //     return this.tasks.filter(function (task) {
    //         return !task.completed 
    //     })    // 화살표 함수를 쓰면 상위 거를 this로 갖는다
    // },

    // getbla: function () {
    //     console.log(this)
    //     return this.tasks.filter((task) => {
    //         console.log(this)
    //         return !task.completed
    //     })
    // }
}

console.log(tasks.getTasksToDo())
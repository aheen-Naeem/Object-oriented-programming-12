import inquirer from "inquirer";
import chalk from "chalk";

class Student{
    name:string;

    constructor(n:string){
        this.name=n;
    }
}

class Person{
    students:Student[]=[]

    addStudent(obj:any){
        this.students.push(obj)
    }
}

const name = await inquirer.prompt({
    type:"input",
    name:"userName",
    message:"Please enter your name"
})

const persons = new Person()

const startProgram = async (persons:Person)=>{
    do{
        console.log("Welcome ",chalk.blue.bold(name.userName))

        let ans = await inquirer.prompt({
            type: "list",
            message: `${chalk.yellow.bold(name.userName) } Who would you like to talk to?`,
            name: "select",
            choices: ["Yourself", "Students"]
        })

        if (ans.select == "Yourself") {
            console.log("I am talking to myself.")
            console.log("I am in good health.")
        }
        if (ans.select == "Students") {
            const ans = await inquirer.prompt({
                type: "input",
                message: `${chalk.greenBright("Which student do you want to talk to?")}`,
                name: "student"
            })

            const student = persons.students.find(val => val.name == ans.student)

            if (!student) {
                const name = new Student(ans.student)
                persons.addStudent(name);

                console.log(` Hello i am ${name.name} and i am fine`)
                console.log(persons.students)
            }
            if (student) {
                console.log(`Hello i am ${student.name} and i am fine..............`)
                console.log(persons.students)
            }
        }
    }while(true)
}
startProgram(persons)
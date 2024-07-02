#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let employees = [];
let condition = true;
function displayemployeeData(employeeData) {
    console.log("EMPLOYEE NAME:", employeeData.empName);
    console.log("FATHER NAME:", employeeData.f_name);
    console.log("CONTACT:", employeeData.c_no);
    console.log("EMAIL:", employeeData.email);
    console.log("GENDER:", employeeData.gender);
    console.log("QUALIFICATION:", employeeData.qua);
    console.log("ADDRESS:", employeeData.address);
    console.log("DEPARTMENT", employeeData.dept);
    console.log("DESIGNATION", employeeData.des);
    console.log("SALARY", employeeData.sal);
    console.log("RANDOM ID:", employeeData.randomId);
}
async function employeeManagement() {
    while (condition) {
        let employeeData = await inquirer.prompt([{
                name: (chalk.greenBright("empName")),
                type: (chalk.red("input")),
                message: (chalk.magenta("Enter employee's name")),
            },
            {
                name: (chalk.greenBright("f_name")),
                type: (chalk.red("input")),
                message: (chalk.magenta("Enter employee's Father Name")),
            },
            {
                name: "c_no",
                type: "input",
                message: (chalk.magenta("Enter employee's contact number")),
            },
            {
                name: "email",
                type: "input",
                message: (chalk.magenta("Enter employess's Email")),
            },
            {
                name: "gender",
                type: "list",
                message: (chalk.magenta("Select an option")),
                choices: ["Male", "Female", "Other"],
            },
            {
                name: "address",
                type: "input",
                message: (chalk.magenta("Enter your Address")),
            },
            {
                name: "qua",
                type: "list",
                message: (chalk.magenta("Select employee's qualification")),
                choices: ["Matric", "Intermediate", "Graduation", "Masters"]
            },
            {
                name: "dept",
                type: "list",
                message: (chalk.magenta("Select employee's department")),
                choices: ["HR", "IT", "Finance", "Digital Media", "Marketing"]
            },
            {
                name: "des",
                type: "list",
                message: (chalk.magenta("Select employee's designation")),
                choices: ["Manager", "Software Engineer", "Accountant", "Graphic Designer", "Marketing Manager"]
            },
            {
                name: "sal",
                type: "input",
                message: (chalk.magenta("Enter employee's salary")),
            },
        ]);
        // Async an random ID
        employeeData.randomId = Math.floor(Math.random() * 5000) + 1000;
        return employeeData;
    }
}
async function mainMenu() {
    while (true) {
        let choice = await inquirer.prompt([
            { name: "action", type: "list", message: "Choose an action:", choices: ["Add Employee", "View Employee", "Edit Employee", "Delete Employee", "Exit"] },
        ]);
        switch (choice.action) {
            case "Add Employee":
                let addEmp = await employeeManagement();
                employees.push(addEmp);
                displayemployeeData(addEmp);
                console.log(chalk.green("Employee added successfully"));
                break;
            case "View Employee":
                console.log("Employee's list");
                employees.forEach(emp => displayemployeeData(emp));
                break;
            case "Edit Employee":
                let editEmp = await employeeManagement();
                let index = employees.findIndex(emp => emp.id === editEmp.id);
                employees[index] = editEmp;
                displayemployeeData(editEmp);
                console.log(chalk.green("Employee updated successfully"));
                // displayemployeeData(editEmp)
                // console.log(editEmp)
                break;
            case "Delete Employee":
                let deleteEmp = await employeeManagement();
                employees.pop();
                displayemployeeData(deleteEmp);
                console.log(deleteEmp);
                console.log(chalk.red("Employee deleted successfully"));
                break;
            case "Exit":
                console.log(chalk.bold.italic.blue("Exiting the program. Goodbye!"));
                process.exit(0);
        }
    }
}
mainMenu();

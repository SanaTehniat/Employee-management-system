#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let employees: any[] = [];
let condition = true;

function displayEmployeeData(employeeData: any) {
    console.log("EMPLOYEE NAME:", employeeData.e_name);
    console.log("FATHER NAME:", employeeData.f_name);
    console.log("CONTACT:", employeeData.c_no);
    console.log("EMAIL:", employeeData.email);
    console.log("GENDER:", employeeData.gender);
    console.log("QUALIFICATION:", employeeData.qua);
    console.log("ADDRESS:", employeeData.address);
    console.log("DEPARTMENT:", employeeData.dept);
    console.log("DESIGNATION:", employeeData.des);
    console.log("SALARY:", employeeData.sal);
    console.log("RANDOM ID:", employeeData.randomId);
}

async function getEmployeeData() {
    let employeeData = await inquirer.prompt([
        {
            name: "e_name",
            type: "input",
            message: chalk.magenta("Enter employee's name"),
        },
        {
            name: "f_name",
            type: "input",
            message: chalk.magenta("Enter employee's Father Name"),
        },
        {
            name: "c_no",
            type: "input",
            message: chalk.magenta("Enter employee's contact number"),
        },
        {
            name: "email",
            type: "input",
            message: chalk.magenta("Enter employee's Email"),
        },
        {
            name: "gender",
            type: "list",
            message: chalk.magenta("Select an option"),
            choices: ["Male", "Female", "Other"],
        },
        {
            name: "address",
            type: "input",
            message: chalk.magenta("Enter your Address"),
        },
        {
            name: "qua",
            type: "list",
            message: chalk.magenta("Select employee's qualification"),
            choices: ["Matric", "Intermediate", "Graduation", "Masters"]
        },
        {
            name: "dept",
            type: "list",
            message: chalk.magenta("Select employee's department"),
            choices: ["HR", "IT", "Finance", "Digital Media", "Marketing"]
        },
        {
            name: "des",
            type: "list",
            message: chalk.magenta("Select employee's designation"),
            choices: ["Manager", "Software Engineer", "Accountant", "Graphic Designer", "Marketing Manager"]
        },
        {
            name: "sal",
            type: "input",
            message: chalk.magenta("Enter employee's salary"),
        },
    ]);
    employeeData.randomId = Math.floor(Math.random() * 5000) + 1000;
    return employeeData;
}

async function mainMenu() {
    while (true) {
        let choice = await inquirer.prompt([
            { name: "action", type: "list", message: "Choose an action:", choices: ["Add Employee", "View Employees", "Edit Employee", "Delete Employee", "Exit"] },
        ]);
        switch (choice.action) {
            case "Add Employee":
                let addEmp = await getEmployeeData();
                employees.push(addEmp);
                displayEmployeeData(addEmp);
                console.log(chalk.green("Employee added successfully"));
                break;

            case "View Employees":
                console.log(chalk.blue("Employee List:"));
                employees.forEach(emp => displayEmployeeData(emp));
                break;

            case "Edit Employee":
                let editId = await inquirer.prompt([
                    { name: "id", type: "input", message: chalk.magenta("Enter the ID of the employee to edit:") }
                ]);
                let editEmpIndex = employees.findIndex(emp => emp.randomId == editId.id);
                if (editEmpIndex !== -1) {
                    let updatedEmp = await getEmployeeData();
                    employees[editEmpIndex] = updatedEmp;
                    console.log(chalk.green("Employee updated successfully"));
                } else {
                    console.log(chalk.red("Employee not found"));
                }
                break;

            case "Delete Employee":
                let deleteId = await inquirer.prompt([
                    { name: "id", type: "input", message: chalk.magenta("Enter the ID of the employee to delete:") }
                ]);
                let deleteEmpIndex = employees.findIndex(emp => emp.randomId == deleteId.id);
                if (deleteEmpIndex !== -1) {
                    employees.splice(deleteEmpIndex, 1);
                    console.log(chalk.red("Employee deleted successfully"));
                } else {
                    console.log(chalk.red("Employee not found"));
                }
                break;

            case "Exit":
                console.log(chalk.bold.italic.blue("Exiting the program. Goodbye!"));
                process.exit(0);
        }
    }
}

mainMenu();



    
    






const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

function startPrompt(){
    //prompt the user with what kind of employee to create
    return inquirer
    .prompt({
        type: "list",
        message: "Which type of team member card should be added?",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    })
    // if("manager"){
    //     createManager();
    // } else if ("engineer"){
    //     createEngineer();
    // } else {
    //     createIntern();
    //     return;
    // }
}
function createEmployee(type){
    console.log(type);
    if (type.role === "Manager"){
        return createManager();
    } else if (type.role === "Engineer") {
        return createEngineer();
    } else if (type.role === "Intern") {
        return createIntern();
    } else {
        return;
    }
    
};
function createManager() {
    return inquirer
    .prompt([
        {
            message: "Hello! The first card to fill out will be presented as a manager! Fill it out with your information.",
            name: "start"
        },
        {
            type: "input",
            message: "Enter the name of the manager: ",
            name: "name"    
        },
        {
            type: "number",
            message: "Enter the ID for the manager: ",
            name: "id"
        },
        {
            type: "input",
            message: "Enter the email for the manager: ",
            name: "email"
        },
        {
            type: "input",
            message: "Enter an image url for the manager: ",
            name: "imageUrl"
        },
        {
            type: "number",
            message: "Enter the office phone number for the manager: ",
            name: "phoneOfficeNumber"
        }

    ])
}
function createEngineer(){
    return inquirer
    .prompt([
        {
            type: "input",
            message: "Enter the name of the engineer: ",
            name: "name"
        },
        {
            type: "number",
            message: "Enter the ID for the engineer: ",
            name: "id"
        },
        {
            type: "input",
            message: "Enter the email for the engineer: ",
            name: "email"
        },
        {
            type: "input",
            message: "Enter the GitHub username for the engineer: ",
            name: "github"
        },
        {
            type: "input",
            message: "Enter an image url for the engineer: ",
            name: "imageUrl"
        }
    ])

};
function createIntern(){
    return inquirer
    .prompt([
        {
            type: "input",
            message: "Enter the name of the intern: ",
            name: "name"
        },
        {
            type: "number",
            message: "Enter the ID of the intern: ",
            name: "id"
        },
        {
            type: "input",
            message: "Enter the email of the intern: ",
            name: "email"
        },
        {
            type: "input",
            message: "Enter the school of the intern: ",
            name: "school"
        },
        {
            type: "input",
            message: "Enter an image url for the intern: ",
            name: "imageUrl"
        }
    ])

};
function againPrompt(){
    return inquirer.prompt([
        {
            type:"list",
            message:"Would you like to add another employee?: ",
            choices:['Yes',"No"],
            name:"confirm"
        }

    ]);
}
async function startApp(){
    const employees = [];
    let firstStart = true;
    do {
        if(!firstStart){
            type = await startPrompt();
        } else {
            firstStart = false;
            type = {role:"Manager"}
        }
        let data = await createEmployee(type);

        console.log("superfun", data);
        switch(type.role){
            case 'Manager':
                employees.push(new Manager(data.name, data.id, data.email, data.phoneOfficeNumber, data.imgUrl));
                break;
            case 'Engineer':
                employees.push(new Engineer(data.name, data.id, data.email, data.github, data.imgUrl));
                break;
            case 'Intern':
                employees.push(new Intern(data.name, data.id, data.email, data.school, data.imgUrl));
                break; 
        }
        var createMore = await againPrompt();
    } while (createMore.confirm!= "No");
    const html = render(employees);
    //console.log(html);
    try{
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
    }
    catch(err){
        return console.log(err);
    }
    fs.writeFile(outputPath, html, function(err){
        if (err){
            return console.log(err)
        }
        console.log("Wrote to a file called team.html!");
    })
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
startApp();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
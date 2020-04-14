// TODO: Write code to define and export the Employee class
const Employee = require("./Employee");
class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email);
        this.school = school;

    }
    getRole() {
        return "Intern";
    }
    getGithub() {
        return this.github;
    }
}

module.exports = Intern;
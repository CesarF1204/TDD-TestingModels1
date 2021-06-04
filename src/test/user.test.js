const chai = require('chai');
const expect = chai.expect;
const UserModel = require('../models/User');

describe("Register", function(){
    it("Given a valid input, it should return true if we successfully create a new user", async function(){
        let user = {"first_name": "Juan", "last_name": "Dela Cruz", "email": "juandelacruz@gmail.com", "password": "juan1234", "user_level_id": "0", "created_at": "2021-06-04 10:59:36", "updated_at": "2021-06-04 10:59:36"};
        let result = await UserModel.register_user(user);
        expect(result).to.equal(true);
    });
});

describe("Sign in", function(){
    it("Given a valid input, it should return true if we successfully logged in", async function(){
        let user = {"email": "princexcesar@gmail.com", "password": "Cesar1234."};
        let result = await UserModel.signin_user(user);
        expect(result).to.equal(true);
    });
});

describe("Get All Users", function(){
    it("Given a valid input, it should return true if we successfully get all users", async function(){
        let result = await UserModel.get_all_users();
        expect(result).to.equal(true);
    });
});

describe("Get All Users by Email", function(){
    it("Given a valid input, it should return true if we successfully get all users by email", async function(){
        let email = {"email": "princexcesar@gmail.com"};
        let result = await UserModel.get_user_by_email(email);
        expect(result).to.equal(true);
    });
});

describe("Update User by id", function(){
    it("Given a valid input, it should return true if we successfully update user's email, first name, and last name by id", async function(){
        let id = 1368;
        let user = {"email": "pedropenduko@gmail.com", "first_name": "Pedro", "last_name": "Penduko", id};
        let result = await UserModel.update_user(user, id);
        expect(result).to.equal(true);
    });
});

describe("Update User Password by id", function(){
    it("Given a valid input, it should return true if we successfully update user's password by id", async function(){
        let id = 1373;
        let user = {"password": "cesar1234", id};
        let result = await UserModel.update_user_password(user, id);
        expect(result).to.equal(true);
    });
});
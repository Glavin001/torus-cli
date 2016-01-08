'use strict';

const inquirer = require('inquirer');

// remove once we have jsonschema
const emailValidator = require('email-validator');
const log = require('../util/log').get('signup');
const CommandInterface = require('../command').CommandInterface;

// TODO: Re-use the json schema from the registry here :)
const FULLNAME_REGEX = /^[a-zA-Z0-9\']{3,64}$/;
const QUESTIONS = [
  {
    type: 'input',
    message: 'Full Name',
    name: 'full_name',
    validate: (input) => {
      if (typeof input === 'string' && input.match(FULLNAME_REGEX)) {
        return true;
      }

      return 'You must provide between 3 and 64 characters [a-zA-Z0-9\']';
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'Email',
    validate: (input) => {
      if (emailValidator.validate(input)) {
        return true;
      }

      return 'You must provide a valid email address';
    }
  },
  {
    type: 'password',
    name: 'password',
    message: 'Password',
    validate: (input) => {
      if (typeof input === 'string' && input.length >= 12) {
        return true;
      }

      return 'You must provide a password greater than 12 characters in length';
    } 
  }];

class Signup extends CommandInterface {
  execute () {
    return new Promise((resolve, reject) => {

      // TODO: Come back and support ocnfirm password
      inquirer.prompt(QUESTIONS, (answers) => {
        log.print(answers);
        resolve(true);
      });
    });
  }
}

module.exports = {
  key: 'signup',
  synopsis: 'registers a user account',
  usage: 'arigato signup',
  Command: Signup,
  example: `\tlocalhost$ arigato signup`
};
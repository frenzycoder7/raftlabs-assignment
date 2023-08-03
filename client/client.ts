import io, { SocketOptions, ManagerOptions } from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import {Spinner} from 'cli-spinner';
import './string.extensions';
import chalk from 'chalk';
import * as readline from 'node:readline/promises';
import { exit, stdin as input, stdout as output } from 'node:process';
import { clearLine } from 'node:readline';
const cli_reader = readline.createInterface({ input, output ,prompt: chalk.yellow('You > ')});

let baseUrl: string = "http://127.0.0.1:7001";

const main:any = async () => {


    "Welcome to socket test".log();
    "============================".log();
    "Please select an option".log();
    "1. Create new Client".log();
    "2. Login Existing client".log();``

    let value: string = await cli_reader.question("Please enter your choice: ");

    switch(value){
        case  "1" : signUp(); break;
        case "2" : login(); break;
        default : console.log("Invalid option"); main();  break;
    }

}

const signUp = async () => {
    chalk.yellow("CREATE NEW CLIEN").log();
    const name: String = await cli_reader.question("Please enter your name: ");
    const email: String = await cli_reader.question("Please enter your email: ");
    const password: String = await cli_reader.question("Please enter your password: ");
    const username: String = await cli_reader.question("Please enter your username: ");

    const spinner = new Spinner('Creating user.. %s');
    spinner.setSpinnerString('|/-\\');

    spinner.start();
    let body  = {
        name,
        email,
        password,
        username
    }
    try {
        const response: AxiosResponse = await axios.post(`${baseUrl}/api/user`, body);
        if(response.status == 201){
            spinner.stop(true);
            chalk.green("User created successfully").log();
            chalk.green("Please login to continue").log();
            main();
        }
    } catch (error) {
        spinner.stop(true);
        chalk.redBright(error.response.data).toString().log();
        main();
    }

}


const login = async () => {
    chalk.yellow("LOGIN YOUR ACCOUNT").log();

    const email: String = await cli_reader.question("Please enter your email or username: ");
    const password: String = await cli_reader.question("Please enter your password: ");

    const spinner = new Spinner('Logging in.. %s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();
    let body  = {
        username: email,
        password
    };

    try {
        const response: AxiosResponse = await axios.post(`${baseUrl}/api/user/login`, body);
        if(response.status == 200){
            spinner.stop(true);
            chalk.green("User logged in successfully").log();
            const token = response.data.data.token;
            chalk.bgGreenBright(chalk.whiteBright("WELCOME TO CHAT ROOM")).log();
            const options: SocketOptions = {
                auth: {
                    authorization: token
                }
            }
            await connecToSocket(options);
        }
    } catch (error) {
        spinner.stop(true);
        console.log(error.response.data);
        main();
    }
}

const connecToSocket = async (options: SocketOptions) => {
    const client = io(baseUrl, options);
    client.on('connect', () => {
        chalk.green("You are connected to socket server").log();
    })

    client.on('user-profile', (data) => {
        (chalk.grey('your profile username is: ')+chalk.green(data.username)).log();
        client.emit('join-room', {});
    })

    client.on('connect_error', (data) => {
        chalk.redBright('connection error'+data).log();
    })

    client.on('disconnect', () => {
        chalk.redBright("Your are disconnected from server").log();
        client.removeAllListeners();
        client.close();
        connecToSocket(options);
    })
    
    client.on('receive-message', (data) => {
        cli_reader.setPrompt("");
        cli_reader.prompt(true);
        (chalk.grey(`${data.from} :`)+chalk.green(` ${data.message}`)).log();
        cli_reader.setPrompt(chalk.yellow('You > '));
        cli_reader.prompt(true);
    });

    client.on('open-input', async () => {
        cli_reader.prompt(true);
        cli_reader.on('line', (value:string) => {
            cli_reader.setPrompt(chalk.yellow('You > '));
            client.emit('send-message', {message: value});
            cli_reader.prompt(true);
        });
    });


    /// listners for update on resources
    client.on('RESOURCE_UPDATE', (data) => {
        cli_reader.setPrompt("");
        cli_reader.prompt(true);
        (chalk.redBright(`LOGS > `)+chalk.bgWhiteBright(chalk.black(`${data.message}`))).log();
        cli_reader.setPrompt(chalk.yellow('You > '));
        cli_reader.prompt(true);
    });
}



main();
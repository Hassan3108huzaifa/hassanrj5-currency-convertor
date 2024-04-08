#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Function to animate text
async function animateText(text, delay = 30) {
    for (let char of text) {
        process.stdout.write(char);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
}
async function fastAnimate(text, delay = 5) {
    for (let char of text) {
        process.stdout.write(char);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
}
async function slowAnimate(text, delay = 50) {
    for (let char of text) {
        process.stdout.write(char);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
}
const currency = {
    Dollar: 1,
    Euro: 0.9,
    Pound: 0.7,
    Dinar: 0.3,
    Riyal: 3.7,
    Yen: 151.6,
    Rupees: 277.7
};
async function main() {
    await fastAnimate(chalk.red.bold("----------------------------------------------------------------------\n"));
    await animateText(chalk.green.bold.italic.underline("\n\t\tWelcome to my Currency Converter Project. Enjoy!\n"));
    const fromCurrency = await inquirer.prompt([
        {
            name: "From",
            type: "list",
            message: await animateText(chalk.bold.yellow.underline("\n\t\t\tChoose your From currency\n")),
            choices: Object.keys(currency)
        },
    ]);
    const toCurrency = await inquirer.prompt([
        {
            name: "To",
            type: "list",
            message: await animateText(chalk.bold.yellow.underline("\n\t\t\tChoose your To currency\n")),
            choices: Object.keys(currency)
        },
    ]);
    const amount = await inquirer.prompt([
        {
            name: "amount",
            message: await animateText(chalk.blue.underline.italic.bold("\nEnter your amount: \n")),
            type: "number"
        },
    ]);
    await fastAnimate(chalk.red.bold("----------------------------------------------------------------------\n"));
    await animateText(chalk.green.bold.italic(`Result Area:-\n`));
    await fastAnimate(chalk.green.bold("----------------------------------------------------------------------\n"));
    await animateText(chalk.green.bold.italic(`Converting amount in ${fromCurrency.From}: ${amount.amount} into ${toCurrency.To}: ?\n`));
    const fromAmount = currency[fromCurrency.From];
    const toAmount = currency[toCurrency.To];
    if (!(fromAmount && toAmount)) {
        console.log(chalk.red("\nInvalid currency selection.\n"));
        return;
    }
    const baseAmount = amount.amount / fromAmount;
    const convertedAmount = baseAmount * toAmount;
    await slowAnimate(chalk.bold.italic.green(convertedAmount.toFixed(2)) + chalk.yellowBright.bold(` ${toCurrency.To}`));
    await fastAnimate(chalk.green.bold("\n----------------------------------------------------------------------\n"));
    const { Exit } = await inquirer.prompt({
        name: "Exit",
        message: "Do you want to use again?",
        type: "confirm"
    });
    if (Exit) {
        main();
    }
    else {
        await slowAnimate(chalk.yellow.bold.italic.underline("\n\t\t\tExiting..."));
        await slowAnimate(chalk.yellow.bold.italic.underline(`\n\t\t    Thanks For using.   `));
    }
}
main();

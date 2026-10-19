import chalk from "chalk";
import figlet from "figlet";
import boxen from "boxen";
import cowsay from "cowsay";

const printers = {
    chalk: (text) => console.log(chalk.bold.green(text)),
    figlet: (text) => console.log(figlet.textSync(text)),
    boxen: (text) => console.log(boxen(text, { padding: 1, borderStyle: "round", borderColor: "cyan" })),
    cowsay: (text) => console.log(cowsay.say({ text: text }))
};

const showHelp = () => {
    console.log("Usage: node print.js <package> <text>");
    console.log("");
    console.log("Packages:");
    console.log("  chalk    coloured bold text");
    console.log("  figlet   big ascii letters");
    console.log("  boxen    text inside a frame");
    console.log("  cowsay   cow says your text");
    console.log("");
    console.log("Commands:");
    console.log("  help     show this list");
    console.log("");
    console.log('Example: node print.js figlet "Hello world"');
};

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error("Error: no parameters passed.");
    console.error("If you do not know the commands, run: node print.js help");
    process.exit(1);
}

if (args[0] === "help") {
    showHelp();
    process.exit(0);
}

const [packageName, ...textParts] = args;
const text = textParts.join(" ");

if (!printers[packageName]) {
    console.error(`Error: unknown package "${packageName}".`);
    console.error("Run: node print.js help");
    process.exit(1);
}

if (text.length === 0) {
    console.error("Error: text is missing.");
    console.error("Run: node print.js help");
    process.exit(1);
}

printers[packageName](text);

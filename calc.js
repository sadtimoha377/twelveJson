const operations = {
    "--sum": {
        title: "Sum",
        run: (numbers) => numbers.reduce((total, number) => total + number, 0)
    },
    "--multiply": {
        title: "Product",
        run: (numbers) => numbers.reduce((total, number) => total * number, 1)
    },
    "--odd": {
        title: "Odd numbers",
        run: (numbers) => numbers.filter((number) => number % 2 !== 0).join(", ")
    },
    "--even": {
        title: "Even numbers",
        run: (numbers) => numbers.filter((number) => number % 2 === 0).join(", ")
    }
};

const args = process.argv.slice(2);

const numbers = args
    .filter((arg) => !arg.startsWith("--"))
    .map(Number);

const flags = args.filter((arg) => arg.startsWith("--"));

if (numbers.length === 0) {
    console.error("Error: no numbers passed.");
    process.exit(1);
}

if (numbers.some(Number.isNaN)) {
    console.error("Error: all parameters before flags must be numbers.");
    process.exit(1);
}

if (flags.length === 0) {
    console.error("Error: no operation passed. Available: --sum --multiply --odd --even");
    process.exit(1);
}

for (const flag of flags) {
    const operation = operations[flag];

    if (!operation) {
        console.error(`Error: unknown operation "${flag}".`);
        continue;
    }

    console.log(`${operation.title} - ${operation.run(numbers)}`);
}

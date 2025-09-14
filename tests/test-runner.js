// test-runner.js
const { exec } = require('child_process');

const runTests = () => {
    exec('jest', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing tests: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Test errors: ${stderr}`);
            return;
        }
        console.log(`Test results:\n${stdout}`);
    });
};

runTests();
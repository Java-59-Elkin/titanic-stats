import fs from 'fs';
import readline from 'readline';

const titanicStream = fs.createReadStream('./train.csv', 'utf8');

const reader = readline.createInterface({
    input: titanicStream,
    crlfDelay: Infinity
})

let isFirstLine = true;
let totalFare = 0;
let totalFareFirstClass = 0;
let totalPassengesFirstClass = 0;
let totalFareSecondClass = 0;
let totalPassengesSecondClass = 0;
let totalFareThirdClass = 0;
let totalPassengesThirdClass = 0;
let totalSurvivedMen = 0;
let totalNonSurvivedMen = 0;
let totalSurvivedWomen = 0;
let totalNonSurvivedWomen = 0;
let totalSurvivedChildren = 0;
let totalNonSurvivedChildren = 0;


reader.on('line', (data) => {
    if(isFirstLine) {
        isFirstLine = false;
        return;
    }
    const fields = data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    if (+fields[2] === 1) {
        totalFareFirstClass += +fields[9];
        totalPassengesFirstClass++;
    } else if (+fields[2] === 2) {
        totalFareSecondClass += +fields[9];
        totalPassengesSecondClass++;
    } else {
        totalFareThirdClass += +fields[9];
        totalPassengesThirdClass++;
    }

    if ((+fields[5] >= 18) || (+fields[5] === 0)) {
        if (+fields[1] === 1) {
            if (fields[4] === 'male') {
                totalSurvivedMen++;
            } else {
                totalSurvivedWomen++;
            }
        } else {
            if (fields[4] === 'male') {
                totalNonSurvivedMen++;
            } else {
                totalNonSurvivedWomen++;
            }
        }
    } else {
        if (+fields[1] === 1) {
            totalSurvivedChildren++;
        } else {
            totalNonSurvivedChildren++;
        }
    }
    totalFare = totalFareFirstClass + totalFareSecondClass + totalFareThirdClass;

})

reader.on('close', () => {
    console.log(`Total fare: ${totalFare.toFixed(2)}`);
    console.log(`Average fare for the First class: ${(totalFareFirstClass / totalPassengesFirstClass).toFixed(2)}`);
    console.log(`Average fare for the Second class: ${(totalFareSecondClass / totalPassengesSecondClass).toFixed(2)}`);
    console.log(`Average fare for the Third class: ${(totalFareThirdClass / totalPassengesThirdClass).toFixed(2)}`);
    console.log(`Total survived: ${totalSurvivedChildren + totalSurvivedMen + totalSurvivedWomen}`);
    console.log(`Total Non survived:  ${totalNonSurvivedChildren + totalNonSurvivedMen + totalNonSurvivedWomen}`);
    console.log(`Survived men:  ${totalSurvivedMen}`);
    console.log(`Non survived men:  ${totalNonSurvivedMen}`);
    console.log(`Survived women:  ${totalSurvivedWomen}`);
    console.log(`Non survived women:  ${totalNonSurvivedWomen}`);
    console.log(`Survived children:  ${totalSurvivedChildren}`);
    console.log(`Non survived children:  ${totalNonSurvivedChildren}`);
})
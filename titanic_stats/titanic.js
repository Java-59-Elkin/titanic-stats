import fs from 'fs';

fs.readFile('./train.csv', 'utf8', function (err, data) {
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
    if (err) {
        console.log(err);
    } else {
        const arr = data.split('\n');
        arr.shift();
        arr.pop();
        for (let i = 0; i < arr.length; i++) {
            const fields = arr[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (Number(fields[2]) === 1) {
                totalFareFirstClass += Number(fields[9]);
                totalPassengesFirstClass++;
            } else if (Number(fields[2]) === 2) {
                totalFareSecondClass += Number(fields[9]);
                totalPassengesSecondClass++;
            } else {
                totalFareThirdClass += Number(fields[9]);
                totalPassengesThirdClass++;
            }
            if ((Number(fields[5]) >= 18) || (Number(fields[5]) === 0)) {
                if (Number(fields[1]) === 1) {
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
                if (Number(fields[1]) === 1) {
                    totalSurvivedChildren++;
                } else {
                    totalNonSurvivedChildren++;
                }
            }
        }
        totalFare = totalFareFirstClass + totalFareSecondClass + totalFareThirdClass;

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
    }
})



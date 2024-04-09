const readline = require('readline-sync');
const { writeNewMissionData } = require('./utils/fsUtils');

async function main() {
    const name = readline.question('Nome da missão:');
    const year = readline.questionInt('Ano da missão:');
    const country = readline.question('País da missão:');
    const destination = readline.question('Destino da missão:');

    const newMission = { name, year, country, destination };
    writeNewMissionData(newMission);
    console.log('Deu certo!');
    /* writeNewMissionData({
            "id": 100,
            "name": "Trybe 1",
            "year": "2024",
            "country": "Brasil",
            "destination": "Vênus"
    }) */
}

main();
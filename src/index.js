const { readMissionsData, writeNewMissionData } = require('./utils/fsUtils.js');

async function main() {
    writeNewMissionData({
            "id": 100,
            "name": "Trybe 1",
            "year": "2024",
            "country": "Brasil",
            "destination": "Vênus"
    });
}

main()
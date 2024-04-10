const fs = require('fs').promises;
const path = require('path');

const MISSION_DATA_PATH = '../../data/missions.json';

async function readMissionsData() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, MISSION_DATA_PATH));
        const missions = JSON.parse(data);
        return missions;
    } catch (error) {
        console.error(`Erro na leitura do arquivo: ${error}`);
    }
}

async function writeNewMissionData(newMission) {
    try {
        const oldMissions = await readMissionsData();
        const newMissionWithId = { id: Date.now(), ...newMission };
        const allMissions = JSON.stringify([...oldMissions, newMissionWithId]);

        await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), allMissions);
        return newMissionWithId;
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error}`);
    }
}

async function updateMissionData(id, updatedMissionData) {
    const oldMIssions = await readMissionsData();
    const updateMission = { id, ...updatedMissionData };
    const updatedMissions = oldMIssions.map((currentMission) => {
            if (currentMission.id === id) return updateMission;
            return currentMission;
        });

    const updateData = JSON.stringify(updatedMissions);

    try { 
        await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), updateData);
        console.log(`Atualizou missão com o id ${id}`);
    } catch (err) {
        console.error(`Erro na escrita do arquivo: ${err}`);
    }
}

async function deleteMissionData(id) {
    const oldMIssions = await readMissionsData();
    const updatedMissions = oldMIssions.filter((mission) => mission.id !== id);

    const updateData = JSON.stringify(updatedMissions);

    try { 
        await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), updateData);
        console.log(`Atualizou missão com o id ${id}`);
    } catch (err) {
        console.error(`Erro na escrita do arquivo: ${err}`);
    }
}

module.exports = {
    readMissionsData,
    writeNewMissionData,
    updateMissionData,
    deleteMissionData,
};

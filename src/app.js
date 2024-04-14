const express = require('express');
const {
    readMissionsData,
    writeNewMissionData,
    updateMissionData,
    deleteMissionData,
} = require('./utils/fsUtils');

require('express-async-errors');

const app = express();

app.use(express.json());

const validateMissionId = async (req, res, next) => {
    const { id } = req.params;

    const idAsNumber = Number(id);
    if (Number.isNaN(idAsNumber)) {
        res.status(400).send({ message: 'ID inválido! Precisa ser um número' });
    }

    const missions = await readMissionsData();

    if (Number(id) in missions) {
        next();
    } else {
        res.status(400).send({ message: 'ID inválido!' }); 
    }
};

const validateMissionData = (req, res, next) => {
    const requiredProperties = ['name', 'year', 'country', 'destinatio'];

    if (requiredProperties.every((property) => property in req.body)) {
        next();
    } else {
        res.status(400).send({ message: 'Missão precisa de name, year, country e destination' });
    }
};

app.get('/missions', async (req, res) => {
    const missions = await readMissionsData();

    return res.status(200).json({ missions });
});

app.post('/missions', validateMissionData, async (req, res) => {
    const newMissions = req.body;

    const newMissionWithId = await writeNewMissionData(newMissions);
    return res.status(200).json({ mission: newMissionWithId });
});

app.put('/missions/:id', validateMissionId, validateMissionData, async (req, res) => {
    const { id } = req.params;

    const updatedMissionData = req.body;
    await updateMissionData(Number(id), updatedMissionData);

    return res.status(201).json({ mission: updatedMissionData });
});

app.delete('/missions/:id', validateMissionId, async (req, res) => {
    const { id } = req.params;
    await deleteMissionData(Number(id));

    return res.status(204).end();
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    next();
});

app.use((error, req, res, _next) => {
    res.status(500).send({ message: 'Eita, deu uim!' });
});

module.exports = app;
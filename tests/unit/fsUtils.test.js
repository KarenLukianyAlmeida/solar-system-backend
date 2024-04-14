const { expect } = require('chai');

const fs = require('fs');
const sinon = require('sinon');

const { readMissionsData } = require('../../src/utils/fsUtils');

const mockMissions = JSON.stringify([
  { id: 1, name: 'Mariner 2', year: '1962', country: 'Estados Unidos', destination: 'Vênus' },
  { id: 2, name: 'Apollo 11', year: '1969', country: 'Estados Unidos', destination: 'Lua' },
  { id: 3, name: 'Pioneer 10', year: '1972', country: 'Estados Unidos', destination: 'Júpiter' },
]);

describe('A função readMissionsData', function () {
  it('retorna um array com todos os elementos do arquivo json', async function () {
    sinon.stub(fs.promises, 'readFile').resolves(mockMissions);
    const missions = await readMissionsData();

    expect(missions).to.be.instanceOf(Array);
    expect(missions).to.have.lengthOf(3);
    sinon.restore();
  });
});
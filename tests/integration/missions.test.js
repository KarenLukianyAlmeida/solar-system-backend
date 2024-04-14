const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const fs = require('fs');

chai.use(chaiHttp);
const { expect } = chai;

const app = require('../../src/app');

const mockMissions = JSON.stringify([
  { id: 1, name: 'Mariner 2', year: '1962', country: 'Estados Unidos', destination: 'Vênus' },
  { id: 2, name: 'Apollo 11', year: '1969', country: 'Estados Unidos', destination: 'Lua' },
  { id: 3, name: 'Pioneer 10', year: '1972', country: 'Estados Unidos', destination: 'Júpiter' },
]);

describe('Rota de missões', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('GET /missions', function () {
    it('Retorna uma lista de missões', async function () {
      sinon.stub(fs.promises, 'readFile').resolves(mockMissions);
      const response = await chai.request(app).get('/missions');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('missions');
      expect(response.body.missions).to.be.instanceOf(Array);
      expect(response.body.missions).to.have.lengthOf(3);
    });
  });

  describe('POST /missions', function () {
    beforeEach(function () {
      sinon.stub(fs.promises, 'writeFile').resolves();
    });

    afterEach(function () {
      sinon.restore();
    });

    const mockMission = {
      name: 'Trybe',
      year: '2022',
      country: 'Brasil',
      destination: 'Saturno',
    };

    it('Retorna a missão criada com um id', async function () {
      const response = await chai.request(app).post('/missions').send(mockMission);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('mission');
      expect(response.body.mission).to.haveOwnProperty('id');
      expect(response.body.mission.name).to.equal(mockMission.name);
      expect(response.body.mission.year).to.equal(mockMission.year);
      expect(response.body.mission.country).to.equal(mockMission.country);
      expect(response.body.mission.destination).to.equal(mockMission.destination);
    });

    it('Escreve a nova missão no arquivo de missões', async function () {
      await chai.request(app).post('/missions').send(mockMission);
      expect(fs.promises.writeFile.called).to.be.equal(true);
    });
  });
});
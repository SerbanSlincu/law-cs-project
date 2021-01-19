const Place = artifacts.require("Place");
const NHSCredentials = artifacts.require("NHSCredentials");
const Visit = artifacts.require("Visit");

it("visitFrom should create a visit with riskState = false", async () => {
  let accounts = await web3.eth.getAccounts();
  let instance = await Place.deployed();
  let visit = await instance.visitFrom(accounts[0],1000);
  let v1 = await Visit.at(visit.logs[0].args['1']);
  let v1State = await v1.riskState.call();
  assert.equal(v1State, false);
});

it("should update an exposed visit", async () => {
  let accounts = await web3.eth.getAccounts();
  let instance = await Place.deployed();
  let dummyCreds = await NHSCredentials.deployed();
  let visit = await instance.visitFrom(accounts[0],1000);
  let v1 = await Visit.at(visit.logs[0].args['1']);
  let otherVisit = await instance.visitFrom(accounts[0],1000);
  let v2 = await Visit.at(otherVisit.logs[0].args['1']);
  let positiveTestReceipt = await v1.recordPositiveTest(dummyCreds.address, {from: accounts[0]})
  let v2EndState = await v2.riskState.call();
  assert.equal(v2EndState, true);
});

//Not sure if I did the from right here
it("notifyRisk should switch riskState to true", async () => {
  let accounts = await web3.eth.getAccounts();
  let instance = await Place.deployed();
  let visit = await instance.visitFrom(accounts[0],1000);
  let v1 = await Visit.at(visit.logs[0].args['1']);
  let notifyRiskReceipt = await v1.notifyRisk({from: instance.address})
  let v1State = await v1.riskState.call();
  assert.equal(v1State, true);
});
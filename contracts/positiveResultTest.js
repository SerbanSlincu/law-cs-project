const Place = artifacts.require("Place");
const NHSCredentials = artifacts.require("NHSCredentials");
const Visit = artifacts.require("Visit");

it("visitFrom should create a visit with riskState = false", async () => {
  let accounts = await web3.eth.getAccounts();
  let p1 = await Place.new(accounts[0]);
  let visit = await p1.visitFrom(accounts[0],1000);
  let v1 = await Visit.at(visit.logs[0].args['1']);
  let v1State = await v1.riskState.call();
  assert.equal(v1State, false);
});

it("should change risk state on conflicting visit", async () => {
  //We use accounts[2] as the NHS in this scenario
  let accounts = await web3.eth.getAccounts();
  let p1 = await Place.new(accounts[0]);
  let visit = await p1.visitFrom(accounts[0],1000);
  let v1 = await Visit.at(visit.logs[0].args['1']);
  let otherVisit = await p1.visitFrom(accounts[0],1000);
  let v2 = await Visit.at(otherVisit.logs[0].args['1']);
  let positiveTestReceipt = await p1.notifyRisk(v1.address, {from: accounts[0]})
  let v2EndState = await v2.riskState.call();
  assert.equal(v2EndState, true);
});
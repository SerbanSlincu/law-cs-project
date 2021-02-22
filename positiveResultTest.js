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
  //Business owner creates a place contract, linking it to the trusted NHS account
  let p1 = await Place.new(accounts[2]);
  //User's app calls method on the place to register visit
  let visit = await p1.visitFrom(accounts[0],1000);
  //The place contract creates an attached visit contract
  let v1 = await Visit.at(visit.logs[0].args['1']);
  //A second user visits at the same time as the first
  let otherVisit = await p1.visitFrom(accounts[0],1000);
  let v2 = await Visit.at(otherVisit.logs[0].args['1']);
  //The NHS tests the first user positive, and notifies the place
  let positiveTestReceipt = await p1.notifyRisk(v1.address, {from: accounts[2]})
  //The place contract sets the second visit's risk state to true
  let v2EndState = await v2.riskState.call();
  assert.equal(v2EndState, true);
});
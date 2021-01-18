var Place = artifacts.require("Place");
var Ownable = artifacts.require("Ownable");
var NHSCredentials = artifacts.require("NHSCredentials");

module.exports = function(deployer) {
  deployer.deploy(Place);
};


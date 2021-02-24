const DonationKlaygram = artifacts.require('./DonationKlaygram.sol')
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(DonationKlaygram)
    .then(() => {
    if (DonationKlaygram._json) {
      // 1. Record recently deployed contract's abi file to 'deployedABI'
      fs.writeFile(
        'deployedABI',
        JSON.stringify(DonationKlaygram._json.abi, 2),
        (err) => {
          if (err) throw err
          console.log(`The abi of ${DonationKlaygram._json.contractName} is recorded on deployedABI file`)
        })
    }

    // 2. Record recently deployed contract's address to 'deployedAddress'
    fs.writeFile(
      'deployedAddress',
      DonationKlaygram.address,
      (err) => {
        if (err) throw err
        console.log(`The deployed contract address * ${DonationKlaygram.address} * is recorded on deployedAddress file`)
    })
  })
}

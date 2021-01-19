import React from 'react';
import { Button } from 'react-native-elements';
import { placeAbi} from './abi';
import 'react-native-get-random-values';

//const Web3 = require('web3');
//const web3 = new Web3('http://localhost:8545');

import { ethers } from 'ethers';


export default function App() {

    /* Web3 test - not working 
    const testPlace = () => {
    
        var contractAddress = '0xC7C01DC9bA41593CE50679D4B58aD14F258B72e5'
        var contract = new web3.eth.Contract(placeAbi, contractAddress);
        console.log(contract)
    } */

    /* (Working) Usage of accessing a deployed contract */
    const testPlace = () => {
        let provider = ethers.getDefaultProvider('ropsten');
        // Address of a deployed Place contract
        var contractAddress = '0x5646c8280a27a5cA4Fb320b06905B6fdc329b432'
        var contract = new ethers.Contract(contractAddress, placeAbi, provider);
        console.log(contract)
   }
   
    /* (Working) Usage of creating a new wallet */
    const createWallet = () => {
        var wallet = new ethers.Wallet.createRandom();
        console.log(wallet)
   }

  return (
        <Button
            onPress={createWallet}
            title="Create new account"
        />
  );
}


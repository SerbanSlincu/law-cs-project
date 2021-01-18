import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import './global';
import { placeAbi} from './abi';

const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

export default function App() {

  const testPlace = () => {
    
    var contractAddress = '0xC7C01DC9bA41593CE50679D4B58aD14F258B72e5'
    var contract = new web3.eth.Contract(placeAbi, contractAddress);
    console.log(contract)
  }

  return (
        <Button
            onPress={testPlace}
            title="Access place"
        />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

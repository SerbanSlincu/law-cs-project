import React, {useState} from 'react';
import { Button, Overlay } from 'react-native-elements';
import 'react-native-get-random-values';
import { styles, alert } from './appStyles.js';
import { View, Text } from 'react-native';

import { ethers } from 'ethers';

import CheckIn from './components/CheckIn.js';
import RegisterPositiveTest from './components/RegisterPositiveTest.js';
import RegisterVaccine from './components/RegisterVaccine.js';
const visitCompilerOutput = require('./Visit.json');
const placeCompilerOutput = require('./Place.json');

export default function App() {
    //hooks
    const [alertLevel, setAlertLevel] = useState(false)
    var visits = [];

    /* (Working) Usage of accessing a deployed contract */
    const testPlace = () => {
        let provider = ethers.getDefaultProvider('http://127.0.0.1:9545/');
        // Address of a deployed Place contract
        var contractAddress = '0x5646c8280a27a5cA4Fb320b06905B6fdc329b432'
        var contract = new ethers.Contract(contractAddress, placeCompilerOutput.abi, provider);
        console.log(contract)
   }

    /* Check if any of the visits have the alert flag on.
       If any of them do, send a notification. */
    const checkVisits = () => {
        let provider = ethers.getDefaultProvider('http://127.0.0.1:9545/');
        for(var i = 0; i < visits.length; i ++) {
            var visitContract = new ethers.Contract(visits[i], visitCompilerOutput.abi, provider);
            if (visitContract.riskState) {
                setAlertLevel(true);
            }
        }
    }

    /* Remove visit if more than 14 days have passed.
       Used during the checkVisit method. */
    const removeVisit = () => {
        console.log(visits[0]);
        var newVisits = [];
        const currTimestamp = Date.now();

        let provider = ethers.getDefaultProvider('http://127.0.0.1:9545/');
        for(var i = 0; i < visits.length; i ++) {
            var visitContract = new ethers.Contract(visits[i], visitCompilerOutput.abi, provider);
            if (Math.abs(visitContract.getTimestamp - currTimestamp) < 14 * 24 * 60 * 60) {
                newVisits.push(visits[i]);
            }
        }
        visits = newVisits;
    }

    //setInterval(() => { checkVisits(); removeVisit(); }, 10000);
  
    return (
        <View style={styles.dashboard}>
            <Text style={styles.title}> Track & Trace </Text>
            <Text style={styles.subtitle}> for users </Text>
            <Text style={styles.alertLevel}> Your alert status is 
                <Text style={alertLevel ? alert.red : alert.green}> {String(alertLevel)}
                </Text>
            </Text>
            <RegisterPositiveTest/>
            <RegisterVaccine/>
            <CheckIn visits={visits}/>
            <View><Text style={styles.footer}>brought to you by CyberCare LLD</Text></View>
        </View>
  );
}

import React, {useState} from 'react';
import { Button } from 'react-native-elements';
import { placeAbi} from './abi';
import 'react-native-get-random-values';
import { styles, alert } from './appStyles.js';
import { View, Text } from 'react-native';

import { ethers } from 'ethers';

import CheckIn from './components/CheckIn.js';
import RegisterPositiveTest from './components/RegisterPositiveTest.js';
import RegisterVaccine from './components/RegisterVaccine.js';

export default function App() {

    //hooks
    const [alertLevel, setAlertLevel] = useState(false)

    /* (Working) Usage of accessing a deployed contract */
    const testPlace = () => {
        let provider = ethers.getDefaultProvider('ropsten');
        // Address of a deployed Place contract
        var contractAddress = '0x5646c8280a27a5cA4Fb320b06905B6fdc329b432'
        var contract = new ethers.Contract(contractAddress, placeAbi, provider);
        console.log(contract)
   }

   /* Check if any of the visits have the alert flag on.
      If any of them do, send a notification.
   */
   const checkVisits = () => {}

   /* Remove visit if more than 14 days have passed.
      Used during the checkVisit method.
   */
   const removeVisit = () => {}
  
   return (
        <View style={styles.dashboard}>
            <Text style={styles.title}> Track and Trace </Text>
            <Text style={styles.alertLevel}> Your alert status is 
                <Text style={alertLevel ? alert.red : alert.green}> {String(alertLevel)}
                </Text>
            </Text>
            <RegisterPositiveTest/>
            <RegisterVaccine/>
            <CheckIn/>
        </View>
  );
}



/* The positive test registering */
import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import { styles } from '../appStyles.js';

import { ethers } from 'ethers';

export default function RegisterPositiveTest(visits) {

    const provider = ethers.getDefaultProvider(); //TODO: What is this?
    const NHSPrivateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
    const NHSWallet = new ethers.Wallet(NHSPrivateKey, provider);
    const visitABI = [{"inputs":[{"internalType":"contract PlaceIf","name":"_place","type":"address"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"notifyRisk","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"place","outputs":[{"internalType":"contract PlaceIf","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"riskState","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"user","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
    const placeABI = [{"inputs":[],"name":"clean","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract VisitIf","name":"","type":"address"}],"name":"notifyRisk","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"visitFrom","outputs":[{"internalType":"contract VisitIf","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"}];

    /*Registers the positive test for each visit*/
    const notifyVisits = async () => {
      var i;
      for (i = 0; i < visits.length; i++) {
          let visitContract = new ethers.Contract(visits[i], visitABI, provider);
          let placeContractAddress = await visitContract.place();
          let placeContract = new ethers.Contract(placeContractAddress, placeABI, provider);
          let placeContractWithSigner = placeContract.connect(NHSWallet);
          let tx = await placeContractWithSigner.notifyRisk(visits[i]);
          await tx.wait();
      }
    }

    return (
        <View style={styles.button}>
            <Button
                onPress={async () => await notifyVisits()}
                title="Register positive test"
            />
        </View>
    );
}

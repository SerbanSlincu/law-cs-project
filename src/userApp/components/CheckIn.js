/* The check-in section of the app */
import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { placeAbi} from '../abi';
import 'react-native-get-random-values';
import { styles } from '../appStyles.js';
import { View, Text } from 'react-native';

import { ethers } from 'ethers';

export default function CheckIn() {

    //hooks
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [walletAddress, setWalletAddress] = useState(0);

    /* Open confirmation modal */
    const toggleOverlay = () => {
        setOverlayVisible(!isOverlayVisible);
    };


    /* Create a new wallet to use during check-in. */
    const createWallet = () => {

        var wallet = new ethers.Wallet.createRandom();
        setWalletAddress(wallet.address);
        console.log(wallet.address);
        setOverlayVisible(true);
   }


   /* Check in to a place and generate unique key for the place validation.*/
   const checkIn = () => {}
  
   return (
        <View>
            <Button
                onPress={createWallet}
                title="Check in"
            />
            <Overlay isVisible={isOverlayVisible}>
                <View>
                    <Text>Your address is: {walletAddress}</Text>
                    <Button title="Done" onPress={toggleOverlay} />
                </View>
            </Overlay>
        </View>
   );
}

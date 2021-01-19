/* The check-in section of the app */
import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { placeAbi} from '../abi';
import 'react-native-get-random-values';
import { styles } from '../appStyles.js';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { ethers } from 'ethers';

export default function CheckIn() {

    //hooks
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [walletAddress, setWalletAddress] = useState(0);
    const [buttonState, setButtonState] = useState('NotPressed');

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
   
   if(isOverlayVisible == false){
        return (
            <Button
                onPress={createWallet}
                title="Check in"
            />
        );
   }
   if(isOverlayVisible == true){
        return(
            <View>
                <Text>
                   Show this QR code to complete the check in
                </Text>
                <QRCode 
                    value={walletAddress}
                    size={200}
                    bgColor='black'
                    fgColor='white'
                />
                <Button
                    onPress={toggleOverlay}
                    title="Done"
                />
            </View>
        );
   }

}

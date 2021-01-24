/* The check-in section of the app */
import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import 'react-native-get-random-values';
import { buttons } from '../appStyles.js';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { styles } from '../appStyles.js';

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
        // console.log(wallet.address);
        setOverlayVisible(true);
   }


   /* Check in to a place and generate unique key for the place validation.*/
   const checkIn = () => {}
   
   if(isOverlayVisible == false){
        return (
            <View style={styles.button}>
                <Button
                    onPress={createWallet}
                    title="Check in"
                />
             </View>
        );
   }
   if(isOverlayVisible == true){
        return(
            <Overlay isVisible={isOverlayVisible}>
                <View style={styles.overlay}>
                    <Text style={styles.text}>
                        Show this QR code to complete the check in
                    </Text>
                    <QRCode 
                        value={walletAddress}
                        size={200}
                        bgColor='black'
                        fgColor='white'
                    />
                    <View style={styles.button}>
                        <Button
                            onPress={toggleOverlay}
                            title="Done"
                        />
                    </View>
                </View>
            </Overlay>
        );
   }

}

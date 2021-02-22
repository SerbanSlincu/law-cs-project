/* The check-in section of the app */
import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import 'react-native-get-random-values';
import { buttons } from '../appStyles.js';
import { Text, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { scanner, styles } from '../appStyles.js';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { ethers } from 'ethers';

export default function CheckIn() {

    //hooks
    const [isScannerVisible, setScannerVisible] = useState(false);
    const [isQRVisible, setQRVisible] = useState(false);
    const [walletAddress, setWalletAddress] = useState(0);
    //const [buttonState, setButtonState] = useState('NotPressed');
    const [isConfirmed, setIsConfirmed] = useState(false);

    /* Create a new wallet to use during check-in. */
    const createWallet = () => {

        var wallet = new ethers.Wallet.createRandom();
        setWalletAddress(wallet.address);
        // console.log(wallet.address);
        setQRVisible(true);
   }

    const handleBarCodeScanned = ({ type, data }) => {
        toggleScanner();
        // to implement something that doesn't allow the user to check in themselves
        // if(walletAddress == data)
        setIsConfirmed(true);
    };
       
    /* open check in scanner */
    const toggleScanner = () => {
        setQRVisible(false);
        setScannerVisible(!isScannerVisible);
    };

    /* open check in qr code */
    const toggleQR = () => {
        setQRVisible(!isQRVisible);
    };


   /* Check in to a place and generate unique key for the place validation.*/
   const checkIn = () => {}
   
   if(isScannerVisible == false && isQRVisible == false && isConfirmed == false){
        return (
            <View style={styles.button}>
                <Button
                    onPress={createWallet}
                    title="Check in"
                    color='#0000CD'
                />
             </View>
        );
   }
   if (isQRVisible == true){
        return(
            <Overlay isVisible={isQRVisible}>
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
                            onPress={toggleScanner}
                            title="Scan confirmation code"
                        />
                    </View>
                </View>
            </Overlay>
        );
   }

   if(isScannerVisible == true){
        return(
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={[StyleSheet.absoluteFillObject, scanner.container]}
            >
                <View style={scanner.layerTop} />
                <View style={scanner.layerCenter}>
                <View style={scanner.layerLeft} />
                <View style={scanner.focused} />
                <View style={scanner.layerRight} />
                </View>
                <View style={scanner.layerBottom} />
            </BarCodeScanner>
        );
   }
   
   if(isConfirmed == true){
        return(
            <Overlay isVisible={isConfirmed}>
                <View>
                    <Text style={styles.text}> Confirmed! </Text>
                    <View style={styles.button}> 
                        <Button
                            onPress={() => setIsConfirmed(false)}
                            title='Done'
                        />
                    </View>
                 </View>
            </Overlay>
        );
   }

}

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, Overlay } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { scanner, styles } from '../appStyles.js';
import { placeAbi, visitAbi } from '../abi';
import { visitBytecode, placeBytecode } from '../bytecodes';
import 'react-native-get-random-values';
import { ethers } from 'ethers';

export default function CheckIn() {

    //hooks
    const [isScannerVisible, setScannerVisible] = useState(false);
    const [isQRVisible, setQRVisible] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [accountAddress, setAccountAddress] = useState(null);
    const [placeWallet, setPlaceWallet] = useState(null);
    const [placeName, setPlaceName] = useState(''); //set upon init

    /* Create an account for the place upon start of app.
       Used to sign contracts. */
    useEffect(() => {
        
        // Set place name
        // if(placeName == '') setPlaceName('White Rabbit');

        createPlaceContract();
        
    });
    

    /* Create a new place contract - to be used at init */
    async function createPlaceContract() {

        var wallet = new ethers.Wallet.createRandom();
        var factory = new ethers.ContractFactory(placeAbi, placeBytecode, wallet)
        var contract = await factory.deploy();
        console.log(contract);
    }

    /* Create a new visit contract with the current account address */
    async function createVisitContract() {

        let provider = ethers.getDefaultProvider();
        var wallet = new ethers.Wallet.createRandom();
        var factory = new ethers.ContractFactory(visitAbi, visitBytecode, wallet)
        var contract = await factory.deploy(placeName, accountAddress, 1000);
        console.log(contract);
    }


    /* Function to handle the data scanned from the barcode
       Creates a new visit contract and returns the address of the deployed contract. */
    const handleBarCodeScanned = ({ type, data }) => {

        setAccountAddress(data);
        toggleScanner();
        toggleQR();

    };
    
       
    /* open check in scanner */
    const toggleScanner = () => {
        setScannerVisible(!isScannerVisible);
    };

    /* open check in qr code */
    const toggleQR = () => {
        setQRVisible(!isQRVisible);
    };

   if(isScannerVisible == false && isQRVisible == false){
        return (
            <View style={styles.button}>
                <Button
                    onPress={toggleScanner}
                    title="Check in guest"
                    color='#0000CD'
                />
            </View>
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

   if (isQRVisible == true){
        return(
            <Overlay isVisible={isQRVisible}>
                <View style={styles.overlay}>
                    <Text style={styles.text}>
                        Show this QR to your guest for confirmation
                    </Text>
                    <QRCode 
                        value={accountAddress}
                        size={200}
                        bgColor='black'
                        fgColor='white'
                    />
                    <View style={styles.button}>
                        <Button
                            onPress={toggleQR}
                            title="Done"
                            color='#0000CD'
                        />
                    </View>
                </View>
            </Overlay>
        );
   }

}


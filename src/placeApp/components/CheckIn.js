import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, Overlay } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { scanner, styles } from '../appStyles.js';
import 'react-native-get-random-values';
import { ethers } from 'ethers';
const visitCompilerOutput = require('../Visit.json');
const placeCompilerOutput = require('../Place.json');

export default function CheckIn() {

    //hooks
    const [isScannerVisible, setScannerVisible] = useState(false);
    const [isQRVisible, setQRVisible] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [placeWallet, setPlaceWallet] = useState(null);
    const [placeContract, setPlaceContract] = useState(null);
    const [latestVisit, setLatestVisit] = useState(null);
    const [placeName, setPlaceName] = useState(''); //set upon init

    /* Create an account for the place upon start of app.
       Used to sign contracts. */
    useEffect(() => {
        if (placeContract == null) { createPlaceContract(); }
        else {
            // for testing on the web interface, simulate a visit from a random account
            // This needs to have enough funds, so run with truffle and select some
            //console.log(placeContract); 
            var privateKey = '7f059350e50efac8c7ca0069295655bedea0a271dad3f89184b5769eec9b21c9';
            let provider = ethers.getDefaultProvider('http://127.0.0.1:9545/');
            var wallet = new ethers.Wallet(privateKey, provider);
            var visit = createVisitContract(wallet.address);
            console.log(visit)
        }
    }, [placeContract]);
    

    /* Create a new place contract - to be used at init */
    async function createPlaceContract() {
        // the network on which truffle is deployed
        // pick an account from the ones given by truffle
        //var publicKey = '0x3a4fc847c66853317ca0170624f2b781ba15151d'
        var privateKey = '2f90c778743110c283f821fdb9945e8a03502291fc29bdfb3b3a1b26ab4f6881';
        let provider = ethers.getDefaultProvider('http://127.0.0.1:9545/');
        var wallet = new ethers.Wallet(privateKey, provider);

        var blahhhhhhhhhhhh = ethers.Wallet.createRandom();
        var factory = ethers.ContractFactory.fromSolidity((placeCompilerOutput:compilerOutput), wallet);
        var contract = factory.attach(blahhhhhhhhhhhh.address, wallet.address);
        console.log(contract)
        setPlaceWallet(wallet);
        setPlaceContract(contract);
    }

    /* Create a new visit contract with the current account address */
    async function createVisitContract(user) {
        // the network on which truffle is deployed
        // pick an account from the ones given by truffle
        let provider = ethers.getDefaultProvider('http://127.0.0.1:9545/');
        var factory = ethers.ContractFactory.fromSolidity((visitCompilerOutput:compilerOutput), placeWallet)

        var visitWallet = ethers.Wallet.createRandom();
        var contract = factory.attach(visitWallet.address, placeContract.address, user, Date.now())

        //var contract = await factory.deploy(placeContract.address, user, Date.now())

        console.log(await contract.owner())
        console.log(await contract.place())
        return contract.address
    }


    /* Function to handle the data scanned from the barcode
       Creates a new visit contract and returns the address of the deployed contract. */
    const handleBarCodeScanned = ({ type, data }) => {

        toggleScanner();

        console.log("Getting a visit from the following user:");
        console.log(data);
        // speed up by regenerating a new one while inactive
        var visit = createVisitContract(data)
        console.log("Returning the following visit:");
        console.log(visit);
        setLatestVisit(visit);
        // should also add to list of visits?

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
                        value={latestVisit}
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


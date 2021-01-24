import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, Overlay } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { scanner, styles } from '../appStyles.js';

export default function CheckIn() {

    //hooks
    const [isScannerVisible, setScannerVisible] = useState(false);
    const [isQRVisible, setQRVisible] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    // const [scanned, setScanned] = useState(false);
    const [accountAddress, setAccountAddress] = useState(null);
    
    /*
    async function getPermission() {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    } */

    const handleBarCodeScanned = ({ type, data }) => {
        // setScanned(true);
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


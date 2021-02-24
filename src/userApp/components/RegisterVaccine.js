/* The register vaccine section */
/* The positive test registering */
import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { View, Text } from 'react-native';
import { styles } from '../appStyles.js';

export default function RegisterVaccine() {

    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const toggleOverlay = () => {
        setOverlayVisible(!isOverlayVisible);
    };

    if(isOverlayVisible == false){
           return (
               <View style={styles.button}>
                    <Button
                        onPress={toggleOverlay}
                        title="Register vaccine"
                    />
                </View>
            );
    }

    if (isOverlayVisible == true){
            return(
                <Overlay isVisible={isOverlayVisible}>
                    <View style={styles.overlay}>
                        <Text style={styles.messages}>
                            NHS has confirmed your vaccine!
                        </Text>
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

/* The register vaccine section */
/* The positive test registering */
import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import { styles } from '../appStyles.js';

export default function RegisterVaccine() {

    return (
        <View style={styles.button}>
            <Button
                title="Register vaccine"
            />
        </View>
    );
}

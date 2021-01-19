/* The positive test registering */
import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { buttons } from '../appStyles.js';

export default function RegisterPositiveTest() {

    return (
        <Button style={buttons.main}
            title="Register positive test"
        />
    );
}

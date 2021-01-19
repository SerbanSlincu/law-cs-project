/* The register vaccine section */
/* The positive test registering */
import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { buttons } from '../appStyles.js';

export default function RegisterVaccine() {

    return (
        <Button style={buttons.main}
            title="Register vaccine"
        />
    );
}

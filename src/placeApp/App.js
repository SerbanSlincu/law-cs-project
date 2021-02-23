import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { styles } from './appStyles.js';

import CheckIn from './components/CheckIn.js';

export default function App() {
  
   return (
       <View style={styles.dashboard}> 
              <Text style={styles.title}> Track and Trace</Text> 
              <CheckIn/> 
          </View> 
  );
}



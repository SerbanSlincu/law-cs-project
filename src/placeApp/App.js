import React, {useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './appStyles.js';

import CheckIn from './components/CheckIn.js';

export default function App() {
  
   return (
       <View style={styles.dashboard}> 
              <Text style={styles.title}> Track and Trace</Text> 
              <Text style={styles.subtitle}> for businesses </Text> 
              <CheckIn/>
              <View><Text style={styles.footer}>brought to you by CyberCare LLD</Text></View>
        </View> 

  );
}



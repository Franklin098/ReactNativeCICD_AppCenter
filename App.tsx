/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren, useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Crashes from "appcenter-crashes";
import Analytics from "appcenter-analytics";

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [didCrash, setDidCrash] = useState(false);
  const [inflationData, setInflationData] = useState({
    inflationRate: 0.0,
    riskFreeRate: 0.0,
    amount: 0.0,
    timeInYears: 1,
    afterInflation: 0.0,
    atRiskFree: 0.0,
    atRiskFreeAfterInflation: 0.0,
    difference: 0
  })


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(()=>{
    checkPreviousSession();
  },[]);

  const checkPreviousSession  = async () => {
      const didCrash = await Crashes.hasCrashedInLastSession();
      // await Crashes.lastSessionCrashReport();
      setDidCrash(didCrash);
  }

  const calculateInflationImpact = (value:number, inflationRate:number, time:number) => {
    return value / Math.pow(1+inflationRate, time);
  }

  const calculate = () => {
    const afterInflation = calculateInflationImpact(inflationData.amount, inflationData.inflationRate/100, inflationData.timeInYears);
    const atRiskFree = inflationData.amount * Math.pow(1+inflationData.riskFreeRate/100, inflationData.timeInYears);
    const atRiskFreeAfterInflation = calculateInflationImpact(atRiskFree, inflationData.inflationRate/100, inflationData.timeInYears);
    const difference = atRiskFreeAfterInflation - afterInflation;
    setInflationData({...inflationData, 
      afterInflation,
      atRiskFree,
      atRiskFreeAfterInflation,
      difference
    });
  }


  return (
    <SafeAreaView style={backgroundStyle}>

          <View style={styles.container}>
          
          <TextInput placeholder="Current inflation rate"
          style={styles.textBox} keyboardType='decimal-pad'
          onChangeText={(value) => setInflationData({...inflationData, inflationRate: Number(value) })}/>
          <TextInput placeholder="Current risk free rate"
          style={styles.textBox} keyboardType='decimal-pad'
          onChangeText={(value) => setInflationData({...inflationData,riskFreeRate: Number(value)})}/>
          <TextInput placeholder="Amount you want to save"
          style={styles.textBox} keyboardType='decimal-pad'
          onChangeText={(value) => setInflationData({...inflationData,amount: Number(value)})}/>
          <TextInput placeholder="For how long (in years) will you save?"
          style={styles.textBox} keyboardType='decimal-pad'
          onChangeText={(value) => setInflationData({...inflationData,timeInYears: Number(value)})}/>

          <TouchableOpacity 
          style={{backgroundColor:"black", marginVertical:10,  height:40, borderRadius:10, justifyContent:'center' , alignItems:"center"}}
          onPress={() => {
          calculate();

          }} >
            <Text style={{color:"white"}}>Calculate Inflation</Text>
          </TouchableOpacity>
          
          <Text style={styles.label}>{inflationData.timeInYears} years from now you will still have ${inflationData.amount} but it will only be worth ${inflationData.afterInflation}.</Text>
          <Text style={styles.label}>But if you invest it at a risk free rate you will have ${inflationData.atRiskFree}.</Text>
          <Text style={styles.label}>Which will be worth ${inflationData.atRiskFreeAfterInflation} after inflation.</Text>
          <Text style={styles.label}>A difference of: ${inflationData.difference}.</Text>
          </View>
      
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="React Native CI/CD App">
            App for testing App Center DevOps features, and a ReactNative CI/CD Pipeline
          </Section>


          <Section title="Inflation Calculator">
         </Section>
       
          

          <Button title='Send Event' onPress={async ()=>{      
            try {
              Analytics.trackEvent("calculate_inflation",{Internet: "Wifi"});
              console.log("event sent");
            } catch (error) {       
              console.log("Error while sending event");
            }

          }}/>
          <Button title='Crash' onPress={()=>{ Crashes.generateTestCrash()}}/>
          {
          didCrash &&
          <Section title="Sorry !">
          We are looking for a fix to solve that crash.
          </Section>
        }

      
        
        </View>
       
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  label: {
    marginTop: 10
  },
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10
  },
  container: {
    marginTop: 20,
    marginBottom:30,
    marginHorizontal: 30
  }
});

export default App;


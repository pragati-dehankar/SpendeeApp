import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './Scripts/navigation';
import React from 'react';
import AuthProvider from './Scripts/context/AuthProvider';
import { SQLiteProvider } from 'expo-sqlite';
import { onErrorInitializationDatabse, onInitDatabse } from './Scripts/sql';
import Fallback from './Scripts/screens/fallback/fallback';
import { DatabaseName } from './Scripts/utils/constants';

export default function App() {
  return (
    <React.Fragment>
      <StatusBar/>
      <React.Suspense fallback={<Fallback/>}>

      
      <SQLiteProvider databaseName={DatabaseName} onInit={onInitDatabse} onError={onErrorInitializationDatabse}>

      </SQLiteProvider>
      <AuthProvider>
   <MainNavigator/>
      </AuthProvider>
      </React.Suspense>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

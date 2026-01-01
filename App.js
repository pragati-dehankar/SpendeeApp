import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import MainNavigator from './Scripts/navigation';
import React from 'react';
import AuthProvider from './Scripts/context/AuthProvider';
import { SQLiteProvider } from 'expo-sqlite';
import { onErrorInitializationDatabse, onInitDatabse } from './Scripts/sql';
import Fallback from './Scripts/screens/fallback/fallback';
import { DatabaseName } from './Scripts/utils/constants';
import { Provider as PaperProvider } from "react-native-paper";
import AppStateProvider from './Scripts/context/AppStateProvider';

export default function App() {
  return (
    <React.Fragment>
      <StatusBar/>
      <React.Suspense fallback={<Fallback/>}>

        {/* PaperProvider must wrap app for TextInput UI */}
        <PaperProvider>

          {/* DB wrapper should wrap Auth and Navigators */}
          <SQLiteProvider 
            databaseName={DatabaseName} 
            onInit={onInitDatabse}
            onError={onErrorInitializationDatabse}
          >
            <AuthProvider>
              <AppStateProvider>
              <MainNavigator />
              </AppStateProvider>
            </AuthProvider>
          </SQLiteProvider>

        </PaperProvider>

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

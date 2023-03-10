import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./screens/MapScreen";
import ConnectWalletScreen from "./screens/ConnectWalletScreen";
import ScannerScreen from "./screens/ScannerScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import * as SQLite from "expo-sqlite";
import { useWalletConnect } from "react-native-walletconnect";

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

const db = SQLite.openDatabase("test7.db");

function AfterConnectTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 2 }}
            >
              <Image
                source={require("./icons/map.png")}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#0782F9" : "black",
                  marginBottom: 5,
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Scan"
        component={ScannerScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 2 }}
            >
              <Image
                source={require("./icons/scanner.png")}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? "#0782F9" : "black",
                  marginBottom: 5,
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 2 }}
            >
              <Image
                source={require("./icons/profile.png")}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#0782F9" : "black",
                  marginBottom: 5,
                }}
              />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function Main() {
  const { createSession, killSession, session, signTransaction } =
    useWalletConnect();

  // console.log("Now???: ", session.length);

  useEffect(() => {
    // console.log("Has Wallet Start: ", session.length);

    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, latitude text, longitude text, description text);"
      );
      console.log("db created");
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!session.length ? (
          <Stack.Screen
            name="Connect Wallet"
            component={ConnectWalletScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen
            name="Home"
            component={AfterConnectTabs}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// import { StyleSheet, Text, View, Button } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { useWalletConnect } from "react-native-walletconnect";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// const Main = () => {
//   const { createSession, killSession, session, signTransaction } =
//     useWalletConnect();
//   const hasWallet = !!session.length;
//   return (
//     <View style={styles.container}>
//       <Text>DONE!</Text>
//       {!hasWallet ? (
//         <Button title="Connect" onPress={() => createSession()} />
//       ) : (
//         <Button title="Kill Session" onPress={() => killSession()} />
//       )}
//       {hasWallet ? (
//         <Button title="PRESS" onPress={() => console.log(session)} />
//       ) : (
//         <></>
//       )}
//       <StatusBar style="auto" />
//     </View>
//   );
// };

// export default Main;

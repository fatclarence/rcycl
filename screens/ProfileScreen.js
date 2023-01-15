import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React from "react";
import { useWalletConnect } from "react-native-walletconnect";
import "@ethersproject/shims";
// Import the ethers library
import { ethers } from "ethers";

let gnrToken = require("./abi.json");

const ProfileScreen = () => {
  const { createSession, killSession, session, signTransaction } =
    useWalletConnect();

  const fetchBalance = async () => {
    let tempProvider = new ethers.providers.JsonRpcProvider(
      "https://sepolia.gateway.tenderly.co/4ueZyXsGXJJ55Yyoyz3JWT"
    );
    let tempSigner = tempProvider.getSigner();

    let contract = new ethers.Contract(
      "0x4db8022Ae2BC5A8fB68Ca848bA6Ae184BbF5b476",
      gnrToken,
      tempSigner
    );

    // const defaultAccount = JSON.stringify(session[0].accounts[0]);
    const defaultAccount = "0x5601A78F9F2037D996c5a51640628FA9645A28c9";

    let balanceBigN = await contract.balanceOf(defaultAccount);
    let balanceNumber = balanceBigN.toNumber();

    let decimals = await contract.decimals();

    let tokenBalance = balanceNumber / Math.pow(10, decimals);

    console.log("HELLLOOOOO: ", tokenBalance);
  };

  return (
    <View style={styles.container}>
      {/* <Text>ProfileScreen</Text> */}
      <TouchableOpacity
        title="Kill Session"
        style={styles.button}
        onPress={() => killSession()}
      >
        <Text style={styles.buttonText}>Kill Current Session</Text>
      </TouchableOpacity>

      <Image
        source={require("../icons/icon_transparent.png")}
        style={styles.image}
      />

      <Button title="CLICK HERE" onPress={() => fetchBalance()} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#0782F9",
    padding: 20,
    alignItems: "center",
    width: "50%",
    borderRadius: 20,
    marginTop: "50%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  image: {
    width: "20%",
    height: "20%",
    resizeMode: "contain",
  },
});

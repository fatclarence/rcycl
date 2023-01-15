import { LogBox } from "react-native";
import Main from "./Main";
import WalletConnectProvider from "react-native-walletconnect";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <WalletConnectProvider>
      <Main />
    </WalletConnectProvider>
  );
};

export default App;

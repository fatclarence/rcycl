import Main from "./Main";
import WalletConnectProvider from "react-native-walletconnect";
import { LogBox } from 'react-native';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications

  return (
    <WalletConnectProvider>
      <Main />
    </WalletConnectProvider>
  );
};

export default App;

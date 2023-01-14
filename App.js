import Main from "./Main";
import WalletConnectProvider from "react-native-walletconnect";

const App = () => {
  return (
    <WalletConnectProvider>
      <Main />
    </WalletConnectProvider>
  );
};

export default App;

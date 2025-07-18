import AppLayout from "./Components/AppLayout";
import appStore from "./Utils/appStore";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={appStore}>
      <AppLayout />
    </Provider>
  );
};

export default App;

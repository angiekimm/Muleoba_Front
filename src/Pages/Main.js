import { Provider} from 'react-redux';
import { createStore } from "redux";
import store from "../redux/Store";
import "../css/Main.css";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";

function Main() {
/*   function reducer(currentState, action) {
    if (currentState === undefined) {
      return {
        uID: '1'
      };
    }
    const newState = { ...currentState };
    if (action.type === 'LOGOUT') {
      newState.uID = 'none';
    }
    return newState;
  } 
  
  const store = createStore(reducer);  */
  
  return (
    <Provider store={store}>
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
    </Provider>
  );
}

export default Main;

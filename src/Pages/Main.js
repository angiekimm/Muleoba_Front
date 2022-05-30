import "../css/Main.css";
import Header from "../components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Welcome from "./Welcome";

function Main() {
  return (
    <div>
      <Header />
      {/* <Routes>
        <Route path="/" element={Welcome} />
      </Routes> */}
    </div>
  );
}

export default Main;

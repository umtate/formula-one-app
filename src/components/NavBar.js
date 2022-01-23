import { Link } from "react-router-dom";
import { ToggleSwitch } from "./ToggleSwitch";

export const NavBar = ({ selectTheme }) => {
  //If the toggle button is checked select light theme else select dark theme
  const toggleHandler = (value) => {
    value ? selectTheme("light") : selectTheme("dark");
  };
  return (
    <nav>
      {/* If logo is available it comes here */}
      <div className="logo"></div>
      <ul>
        <li id="champions-link">
          <Link to="/">Champions</Link>
        </li>
      </ul>
      <ToggleSwitch toggle={toggleHandler} />
    </nav>
  );
};

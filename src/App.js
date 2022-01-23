import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.scss";

import { ListOfWorldChampions } from "./pages/ListOfWorldChampions";
import { ListOfWinners } from "./pages/ListOfWinners";
import { NavBar } from "./components/NavBar";

export default function App() {
  //Setting up global state
  const [champions, setChampions] = useState([]);
  const [selectedChamp, setSelectedChamp] = useState(null);
  const [theme, setTheme] = useState("dark");
  const navigator = useNavigate();

  const BASE_URL = "http://ergast.com/api/f1/";
  const FILTER_YEAR = 2005;

  // When user clicks champion navigate to winners page and also set selected champ state
  const selectChampion = (ch) => {
    setSelectedChamp(ch);
    navigator(`/winners:${ch.season}`);
  };

  //This function is pasted as a prop to the Navbar to be able to toggle theme
  const selectTheme = (theme) => {
    setTheme(theme);
  };

  //This function perform a http request to ergast and sets champions state
  const setChampionsDataHandler = () => {
    axios
      .get(`${BASE_URL}driverStandings/1.json?limit=36&offset=36`)
      .then((res) => {
        const champs = res.data.MRData.StandingsTable.StandingsLists.filter(
          (standing) => parseInt(standing.season) >= FILTER_YEAR
        );
        setChampions(champs);
      })
      .catch((err) => console.log(err));
  };

  //When the component loads get champions from axios
  useEffect(() => {
    setChampionsDataHandler();
  }, []);

  return (
    <>
      {/* Parent class that toggles between themes */}
      <div className={`${theme}Theme`}>
        <div className="content">
          <NavBar selectTheme={selectTheme} />
          {/* Set up routes for the platform */}
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ListOfWorldChampions
                  selectChampion={selectChampion}
                  champions={champions}
                />
              }
            />
            <Route
              exact
              path="/winners:year"
              element={
                <ListOfWinners baseUrl={BASE_URL} champion={selectedChamp} />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

// ARCHITECTURAL CHOICES
// I use hooks to manage state because of the current simplicity of the app.
// As the app grows in size and when state management becomes crucial, Redux can be a better approach.
// I also choose to use Function Components rather than class components, as they are simpler to work with.

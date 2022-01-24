import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import trophy from "../images/trophy-icon.png";
import { Loader } from "../components/Loader";
import { Heading } from "../components/Heading";

export const ListOfWinners = ({ baseUrl, champion }) => {
  const [winners, setWinners] = useState([]);

  // Get the selected year from the url arguments
  const { year } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    //On load check if champion prop is not null, if it is null route back to champions page
    if (!champion) {
      navigator("/");
    } else {
      // Get the year from the url arguments, and do a get request for the particular year
      const yearParam = year.slice(1);
      axios
        .get(`${baseUrl}${yearParam}/results/1.json`)
        .then((res) => {
          const winnersForSelectedYear = res?.data?.MRData?.RaceTable?.Races;
          setWinners(winnersForSelectedYear);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  //This function filters through the champions prop and selects which objects to highlight
  const championHighlightHandler = (code, round) => {
    //Return the highlighted row with a trophy icon.
    return champion.DriverStandings.some(
      (champ) => champ?.Driver?.code === code
    ) ? (
      <img id={`highlight-${code}-${round}`} src={trophy} height="25"></img>
    ) : (
      <></>
    );
  };

  const highlightRowHandler = (code) => {
    let toHigh = code.some((results) =>
      champion.DriverStandings.some(
        (champ) => champ?.Driver?.code === results.Driver.code
      )
    );
    return toHigh;
  };

  return (
    <>
      {/* If the winners for a selected years are still loading show loader */}
      {!winners.length ? (
        <Loader />
      ) : (
        <>
          <Heading heading={`${year.slice(1)} Driver Standings`} />
          <span className="go-back">
            {" "}
            <Link to="/">Go back</Link>
          </span>
          <table className="list-table">
            <thead>
              <tr>
                <th>Round</th>
                <th>Race Name</th>
                <th>Winner</th>
                <th>Nationality</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {winners?.map((w) => (
                <tr
                  key={w?.round}
                  winner={w}
                  className={
                    highlightRowHandler(w.Results) ? "highlight-row" : ""
                  }
                >
                  <td>{w?.round}</td>
                  <td>{w?.raceName}</td>
                  <td>
                    {w.Results.map((results) => (
                      <span key={results.Driver.code}>
                        {results.Driver?.familyName}
                      </span>
                    ))}
                  </td>
                  <td>
                    {w.Results.map((results) => (
                      <span key={results.Driver.code}>
                        {results?.Driver?.nationality}
                      </span>
                    ))}
                  </td>
                  <td>
                    {w.Results.map((results) => (
                      <span
                        key={results.Driver.code}
                        id={`champ-id-${w?.round}-${results.Driver.code}`}
                      >
                        {championHighlightHandler(
                          results?.Driver?.code,
                          w?.round
                        )}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

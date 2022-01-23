import React from "react";
import { Heading } from "../components/Heading";
import { Loader } from "../components/Loader";

import { WorldChampion } from "../components/WorldChampion";

export const ListOfWorldChampions = ({ champions, selectChampion }) => {
  return (
    <>
      {/* While data is loading show loader */}
      {!champions.length ? (
        <Loader />
      ) : (
        <>
          <Heading heading={"F1 World Champions"} />
          {/* When we have the data iterate through the array and display each item*/}
          {champions?.map((ch) => (
            <div key={ch?.season} onClick={() => selectChampion(ch)}>
              <WorldChampion
                champion={ch?.DriverStandings}
                season={ch?.season}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

////
// It should render list of champions

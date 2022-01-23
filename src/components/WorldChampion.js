import React from "react";
import { countryCodeLookUp } from "../utils/utils";

export const WorldChampion = ({ champion, season }) => {
  return champion.map((ch) => (
    <div key={ch?.Driver?.driverId}>
      <div className="card-container">
        <div className="card-body">
          <div className="card-content">
            <div>
              <div className="card-text-header">{season}</div>
            </div>
            <div className="card-text">
              <div
                className="card-text-value"
                id={`world-champ-${season}-${ch?.Driver?.familyName}`}
              >
                {" "}
                {ch?.Driver?.familyName}{" "}
              </div>
              <div className="card-text-header">
                {" "}
                {ch?.Constructors[0]?.name}{" "}
              </div>
            </div>
          </div>
          <div className="card-side-info">
            <span className="side-info">
              <div className="card-text-header"> Points: {ch?.points} </div>
            </span>
            <span className="side-info">
              <div className="card-text-header">Wins: {ch?.wins}</div>
            </span>
            <span className="flags circular-icon">
              {" "}
              <img
                // Here we get the nationality of the driver and get the flag of their  country
                src={`https://countryflagsapi.com/svg/${countryCodeLookUp(
                  ch?.Driver?.nationality
                ).toLowerCase()}`}
                alt={`${ch?.Driver?.nationality} flag`}
                width="50"
              ></img>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  ));
};

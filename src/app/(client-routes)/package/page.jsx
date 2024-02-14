"use client";
import React, { useState } from "react";

const ToggleDivsExample = () => {
  // Use an object to track the toggle state for each div
  const [divStates, setDivStates] = useState({});

  // Function to handle the toggle for a specific div
  const handleToggle = (divId) => {
    setDivStates((prevDivStates) => ({
      ...prevDivStates,
      [divId]: !prevDivStates[divId],
    }));
    divStates;
  };

  return (
    <div>
      {/* Map through your data or manually create button-div pairs */}
      {[1, 2, 3].map((id) => (
        <div key={id}>
          <button onClick={() => handleToggle(id)}>Toggle Div {id}</button>
          <div className={divStates[id] ? "" : "d-none"}>
            {/* Content of the adjacent div */}
            {divStates[id] ? `Toggled Content ${id}` : `Default Content ${id}`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToggleDivsExample;

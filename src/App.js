import React from "react";
import "./App.css";

const timeSigStyle = {
  fontSize: "60px"
};

function App() {
  return (
    <div className="App">
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <div>
          <svg id="beat" width="900px">
            {/* <!-- start bar --> */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="80"
              stroke="#000"
              stroke-width="10"
            />

            {/* <!-- time signature --> */}
            <text style={timeSigStyle} x="20" y="40">
              4
            </text>
            <text style={timeSigStyle} x="20" y="80">
              4
            </text>

            {/* <!-- bar lines -->
          <!-- time sig takes up 60 width --> */}
            <line x1="0" y1="0" x2="900" y2="0" stroke="#000" />
            <line x1="0" y1="20" x2="900" y2="20" stroke="#000" />
            <line x1="0" y1="40" x2="900" y2="40" stroke="#000" />
            <line x1="0" y1="60" x2="900" y2="60" stroke="#000" />
            <line x1="0" y1="80" x2="900" y2="80" stroke="#000" />

            {/* <!-- end bar --> */}
            <line
              x1="900"
              y1="0"
              x2="900"
              y2="80"
              stroke="#000"
              stroke-width="10"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;

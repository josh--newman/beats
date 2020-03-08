import React, { useEffect, useState } from "react";
import "./App.css";
import Tone from "tone";

const timeSigStyle = {
  fontSize: "60px"
};

const STAVE_X_OFFSET = 100;

const NOTES = {
  KICK: "K",
  SNARE: "S",
  HIGH_HAT: "H",
  HIGH_TOM: "T1",
  MID_TOM: "T2",
  FLOOR_TOM: "T3",
  RIDE: "R"
};

const NOTE_Y_COORDS = {
  [NOTES.KICK]: 70,
  [NOTES.SNARE]: 30,
  [NOTES.HIGH_HAT]: -10,
  [NOTES.HIGH_TOM]: 10,
  [NOTES.MID_TOM]: 20,
  [NOTES.FLOOR_TOM]: 50,
  [NOTES.RIDE]: 0
};

const beatState = {
  timeSignature: "4/4",
  bars: [
    [NOTES.KICK, NOTES.HIGH_HAT],
    [],
    [NOTES.HIGH_HAT],
    [],
    [NOTES.SNARE, NOTES.HIGH_HAT],
    [],
    [NOTES.KICK, NOTES.HIGH_HAT],
    [],
    [NOTES.HIGH_HAT],
    [],
    [NOTES.KICK, NOTES.HIGH_HAT],
    [],
    [NOTES.SNARE, NOTES.HIGH_HAT],
    [],
    [NOTES.HIGH_HAT],
    []
  ]
};

const drums = new Tone.Players({
  [NOTES.KICK]: "./sounds/kick.mp3",
  [NOTES.SNARE]: "./sounds/snare.mp3",
  [NOTES.HIGH_HAT]: "./sounds/high-hat.mp3",
  [NOTES.HIGH_TOM]: "./sounds/small-tom.mp3",
  [NOTES.MID_TOM]: "./sounds/mid-tom.mp3",
  [NOTES.FLOOR_TOM]: "./sounds/floor-tom.mp3",
  [NOTES.RIDE]: "./sounds/ride.mp3"
}).toMaster();

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequence, setSequence] = useState(null);
  const [currentBar, setCurrentBar] = useState(null);
  const [bpm, setBpm] = useState(Tone.Transport.bpm.value);

  useEffect(() => {
    const seq = new Tone.Sequence(
      (time, count) => {
        const notes = beatState.bars[count];
        notes.forEach(note => {
          drums.get(note).start(time, 0);
        });
        setCurrentBar(count);
      },
      [...Array(16).keys()],
      "16n"
    );
    setSequence(seq);
  }, []);

  return (
    <div className="App">
      <button
        onClick={async () => {
          Tone.Transport.toggle();
          isPlaying ? sequence.stop() : sequence.start(0);
          setIsPlaying(isPlaying ? false : true);
        }}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>
      <div>
        <input
          type="range"
          min="20"
          max="240"
          value={bpm}
          onChange={e => {
            console.log(e.target);
            setBpm(e.target.value);
            Tone.Transport.bpm.value = e.target.value;
          }}
        />
        {bpm}
      </div>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <div>
          <svg id="beat" width="900px" style={{ overflow: "visible" }}>
            {/* <!-- start bar --> */}
            <line x1="0" y1="0" x2="0" y2="80" stroke="#000" strokeWidth="10" />

            {/* <!-- time signature --> */}
            <text style={timeSigStyle} x="20" y="40">
              4
            </text>
            <text style={timeSigStyle} x="20" y="80">
              4
            </text>

            {/* <!-- stave lines -->
            <!-- time sig takes up 60 width --> */}
            <line x1="0" y1="0" x2="900" y2="0" stroke="#000" />
            <line x1="0" y1="20" x2="900" y2="20" stroke="#000" />
            <line x1="0" y1="40" x2="900" y2="40" stroke="#000" />
            <line x1="0" y1="60" x2="900" y2="60" stroke="#000" />
            <line x1="0" y1="80" x2="900" y2="80" stroke="#000" />

            {/* note markers */}
            <line x1="100" y1="0" x2="100" y2="300" stroke="#777" />
            <line x1="150" y1="0" x2="150" y2="300" stroke="#777" />
            <line x1="200" y1="0" x2="200" y2="300" stroke="#777" />
            <line x1="250" y1="0" x2="250" y2="300" stroke="#777" />
            <line x1="300" y1="0" x2="300" y2="300" stroke="#777" />
            <line x1="350" y1="0" x2="350" y2="300" stroke="#777" />
            <line x1="400" y1="0" x2="400" y2="300" stroke="#777" />
            <line x1="450" y1="0" x2="450" y2="300" stroke="#777" />
            <line x1="500" y1="0" x2="500" y2="300" stroke="#777" />
            <line x1="550" y1="0" x2="550" y2="300" stroke="#777" />
            <line x1="600" y1="0" x2="600" y2="300" stroke="#777" />
            <line x1="650" y1="0" x2="650" y2="300" stroke="#777" />
            <line x1="700" y1="0" x2="700" y2="300" stroke="#777" />
            <line x1="750" y1="0" x2="750" y2="300" stroke="#777" />
            <line x1="800" y1="0" x2="800" y2="300" stroke="#777" />
            <line x1="850" y1="0" x2="850" y2="300" stroke="#777" />

            {/* beats */}
            {beatState.bars.map((bar, i) => {
              return bar.map(beat => {
                return (
                  <circle
                    fill={currentBar === i ? "blue" : "inherit"}
                    key={`${beat}_${i}`}
                    cx={STAVE_X_OFFSET + i * 50}
                    cy={NOTE_Y_COORDS[beat]}
                    r="10"
                  />
                );
              });
            })}

            {/* <!-- end bar --> */}
            <line
              x1="900"
              y1="0"
              x2="900"
              y2="80"
              stroke="#000"
              strokeWidth="10"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;

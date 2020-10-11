import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { setRTLTextPlugin } from "react-map-gl";
import { listLogEntries } from "./API";
import LogEntryForm from "./LogEntryForm";
import "./App.css";

setRTLTextPlugin(
  // find out the latest version at https://www.npmjs.com/package/@mapbox/mapbox-gl-rtl-text
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  // lazy: only load when the map first encounters Hebrew or Arabic text
  true
);

function App() {
  const [showPopup, setShowPopup] = useState({});
  const [logEntries, setLogEntries] = useState([]);
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 31.4403817,
    longitude: 35.1216261,
    zoom: 7,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddEntryLocationPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({ longitude, latitude });

    setShowPopup({});
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mor789/ckg2v2cfl13a919o8kmawfnqb"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddEntryLocationPopup}
    >
      {logEntries?.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <div
              className="marker yellow"
              onClick={() => {
                setShowPopup({ [entry._id]: true });
                setAddEntryLocation(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                height={`${viewport.zoom * 4}px`}
                widht={`${viewport.zoom * 4}px`}
                viewBox="0 0 930.000000 1280.000000"
                preserveAspectRatio="xMidYMid meet"
                data-livestyle-extension="available"
              >
                <metadata>
                  Created by potrace 1.15, written by Peter Selinger 2001-2017
                </metadata>
                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                  <path d="M4335 12789 c-1496 -104 -2843 -915 -3635 -2190 -232 -373 -414 -787 -529 -1204 -305 -1107 -197 -2278 305 -3295 191 -387 372 -660 676 -1020 34 -41 753 -976 1596 -2077 918 -1199 1555 -2022 1588 -2052 186 -170 442 -170 628 0 33 30 670 853 1588 2052 843 1101 1562 2036 1596 2077 304 360 485 633 676 1020 566 1147 629 2502 174 3695 -353 923 -967 1689 -1798 2242 -825 549 -1864 821 -2865 752z m559 -2254 c224 -29 398 -81 601 -180 553 -268 931 -756 1062 -1374 25 -116 27 -145 28 -366 0 -267 -10 -345 -70 -555 -161 -561 -586 -1032 -1130 -1253 -201 -82 -365 -120 -592 -139 -294 -25 -593 23 -878 139 -544 221 -969 692 -1130 1253 -60 210 -70 288 -70 555 1 221 3 250 28 366 112 527 406 965 842 1252 177 116 437 227 637 271 209 46 467 58 672 31z" />
                </g>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              dynamicPosition={true}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                {entry.description && <p>{entry.description}</p>}
                {entry.comments && <p>{entry.comments}</p>}
                {entry.rating && <p>דירוג: {entry.rating}</p>}
                {entry.image && <img src={entry.image} alt={entry.title}></img>}
                <small>
                  תאריך ביקור: {new Date(entry.visitDate).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}

      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation?.latitude}
            longitude={addEntryLocation?.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <div className="marker red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                height={`${viewport.zoom * 4}px`}
                widht={`${viewport.zoom * 4}px`}
                viewBox="0 0 930.000000 1280.000000"
                preserveAspectRatio="xMidYMid meet"
                data-livestyle-extension="available"
              >
                <metadata>
                  Created by potrace 1.15, written by Peter Selinger 2001-2017
                </metadata>
                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                  <path d="M4335 12789 c-1496 -104 -2843 -915 -3635 -2190 -232 -373 -414 -787 -529 -1204 -305 -1107 -197 -2278 305 -3295 191 -387 372 -660 676 -1020 34 -41 753 -976 1596 -2077 918 -1199 1555 -2022 1588 -2052 186 -170 442 -170 628 0 33 30 670 853 1588 2052 843 1101 1562 2036 1596 2077 304 360 485 633 676 1020 566 1147 629 2502 174 3695 -353 923 -967 1689 -1798 2242 -825 549 -1864 821 -2865 752z m559 -2254 c224 -29 398 -81 601 -180 553 -268 931 -756 1062 -1374 25 -116 27 -145 28 -366 0 -267 -10 -345 -70 -555 -161 -561 -586 -1032 -1130 -1253 -201 -82 -365 -120 -592 -139 -294 -25 -593 23 -878 139 -544 221 -969 692 -1130 1253 -60 210 -70 288 -70 555 1 221 3 250 28 366 112 527 406 965 842 1252 177 116 437 227 637 271 209 46 467 58 672 31z" />
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            dynamicPosition={true}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
}

export default App;

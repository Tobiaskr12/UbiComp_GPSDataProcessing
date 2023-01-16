import React, { useState, useEffect } from 'react';
import { MapContainer , TileLayer, Polyline  } from 'react-leaflet';
import { fetchData } from './util/fetchData';
import { MedianFilter } from './util/MedianFilter';

const RawMap = (props) => {
  const [walkingDataGPS, setWalkingDataGPS] = useState([]);
  const [walkingDataPhone, setWalkingDataPhone] = useState([]);

  const [runningDataGPS, setRunningDataGPS] = useState([]);
  const [runningDataPhone, setRunningDataPhone] = useState([]);

  const [bikingDataGPS, setBikingDataGPS] = useState([]);
  const [bikingDataPhone, setBikingDataPhone] = useState([]);

  const [drivingDataGPS, setDrivingDataGPS] = useState([]);
  const [drivingDataPhone, setDrivingDataPhone] = useState([]);
  
  useEffect(() => {
    /**
     * Walking data
     */
    fetchData("Walking.csv").then((result) => 
        setWalkingDataGPS(
            performMedianFiltering(result, "gt_lat", "gt_long")
        )
    );

    fetchData("Walking.csv").then((result) => 
        setWalkingDataPhone(
            performMedianFiltering(result, "phone_lat", "phone_long")
        )
    );

    /**
     * Running data
     */
    fetchData("Running.csv").then((result) => 
        setRunningDataGPS(
            performMedianFiltering(result, "gt_lat", "gt_long")
        )
    );

    fetchData("Running.csv").then((result) => 
        setRunningDataPhone(
            performMedianFiltering(result, "phone_lat", "phone_long")
        )
    );

    /**
     * Biking data
     */
    fetchData("Biking.csv").then((result) => 
        setBikingDataGPS(
            performMedianFiltering(result, "gt_lat", "gt_long")
        )
    );

    fetchData("Biking.csv").then((result) => 
        setBikingDataPhone(
            performMedianFiltering(result, "phone_lat", "phone_long")
        )
    );

    /**
     * Driving data
     */
    fetchData("Driving.csv").then((result) => 
        setDrivingDataGPS(
            performMedianFiltering(result, "gt_lat", "gt_long")
        )
    );

    fetchData("Driving.csv").then((result) => 
        setDrivingDataPhone(
            performMedianFiltering(result, "phone_lat", "phone_long")
        )
    );
  }, [props.filterLag]);


  const performMedianFiltering = (data, latColName, lngColName) => {
    const lag = props.filterLag;
    const latlng = [];
    
    for (let i = 0; i < data.length; i++) {
        if (!data[i][latColName] || isNaN(data[i][latColName]) || !data[i][lngColName] || isNaN(data[i][lngColName])) {
            continue;
        }

        const lat = MedianFilter(data.slice(Math.max(0, i - lag), i + 1), latColName);
        const long = MedianFilter(data.slice(Math.max(0, i - lag), i + 1), lngColName);

        latlng.push([lat, long]);
    }

    return latlng;
  }


  return (
    <>
        {props.isVisible && 
            <div className="map-container">
                <MapContainer center={[56.161286, 10.200702]} zoom={13}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <Polyline color="rgb(240, 114, 17)" positions={walkingDataGPS} />
                    <Polyline color="rgb(240, 210, 17)" positions={walkingDataPhone} />

                    <Polyline color="rgb(20, 17, 240)" positions={runningDataGPS} />
                    <Polyline color="rgb(97, 158, 255)" positions={runningDataPhone} />

                    <Polyline color="rgb(16, 209, 2)" positions={bikingDataGPS} />
                    <Polyline color="rgb(135, 245, 127)" positions={bikingDataPhone} />

                    <Polyline color="rgb(255, 0, 0)" positions={drivingDataGPS} />
                    <Polyline color="rgb(240, 17, 203)" positions={drivingDataPhone} />
                </MapContainer>
            </div>
        }
    </>
  );
};

export default RawMap;
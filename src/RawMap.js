import React, { useState, useEffect } from 'react';
import { MapContainer , TileLayer, Polyline  } from 'react-leaflet';
import { fetchData } from './util/fetchData';

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
    fetchData("Walking.csv").then((result)=>setWalkingDataGPS(result.map((point) => {
        if (point.gt_lat && point.gt_long && !isNaN(point.gt_lat) && !isNaN(point.gt_long)) {
            return [point.gt_lat, point.gt_long];
        }
        return null;
    }).filter(Boolean)));

    fetchData("Walking.csv").then((result)=>setWalkingDataPhone(result.map((point) => {
        if (point.phone_lat && point.phone_long && !isNaN(point.phone_lat) && !isNaN(point.phone_long)) {
            return [point.phone_lat, point.phone_long];
        }
        return null;
    }).filter(Boolean)));

    /**
     * Running data
     */
    fetchData("Running.csv").then((result)=>setRunningDataGPS(result.map((point) => {
        if (point.gt_lat && point.gt_long && !isNaN(point.gt_lat) && !isNaN(point.gt_long)) {
            return [point.gt_lat, point.gt_long];
        }
        return null;
    }).filter(Boolean)));

    fetchData("Running.csv").then((result)=>setRunningDataPhone(result.map((point) => {
        if (point.phone_lat && point.phone_long && !isNaN(point.phone_lat) && !isNaN(point.phone_long)) {
            return [point.phone_lat, point.phone_long];
        }
        return null;
    }).filter(Boolean)));

    /**
     * Biking data
     */
    fetchData("Biking.csv").then((result)=>setBikingDataGPS(result.map((point) => {
        if (point.gt_lat && point.gt_long && !isNaN(point.gt_lat) && !isNaN(point.gt_long)) {
            return [point.gt_lat, point.gt_long];
        }
        return null;
    }).filter(Boolean)));

    fetchData("Biking.csv").then((result)=>setBikingDataPhone(result.map((point) => {
        if (point.phone_lat && point.phone_long && !isNaN(point.phone_lat) && !isNaN(point.phone_long)) {
            return [point.phone_lat, point.phone_long];
        }
        return null;
    }).filter(Boolean)));

    /**
     * Driving data
     */
    fetchData("Driving.csv").then((result)=>setDrivingDataGPS(result.map((point) => {
        if (point.gt_lat && point.gt_long && !isNaN(point.gt_lat) && !isNaN(point.gt_long)) {
            return [point.gt_lat, point.gt_long];
        }
        return null;
    }).filter(Boolean)));

    fetchData("Driving.csv").then((result)=>setDrivingDataPhone(result.map((point) => {
        if (point.phone_lat && point.phone_long && !isNaN(point.phone_lat) && !isNaN(point.phone_long)) {
            return [point.phone_lat, point.phone_long];
        }
        return null;
    }).filter(Boolean)));
  }, []);


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
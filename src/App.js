import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

import DataDisplay from './components/DataDisplay';
import UserForm from './components/UserForm';

function App() {
  // url format: 
  // query coordinates are gps latitude, longitude
  // radius is in meters
  // &coordinates=37.5341,-122.2473&radius=8047
  const defaultQueryValues={
    "lat":37.5341,
    "long":-122.2473,
    "radius":8047
  };
  
  // queryValues is an object with correctly formatted params ready for URl
  // queryUrl is used directly
  const baseUrl='https://docs.openaq.org/v2/locations?entity=community&country=US&has_geo=true';
  const defaultUrl=baseUrl + '&coordinates=' + defaultQueryValues.lat + ',' + defaultQueryValues.long + '&radius=' + defaultQueryValues.radius;

  const [queryValues, setQueryValues] = useState(defaultQueryValues);
  const [queryUrl, setQueryUrl] = useState(defaultUrl);
  const [communityData, setCommunityData] = useState([]);

  // Next build: show server status errors on screen
  // reflect error structure in displayData
  // const [error, setError] = useState(false);
  // const [errorMsg, setErrorMsg] = useState('');

  useEffect(()=>{
    axios.get(queryUrl)
    .then((res)=>{
      // res.data.results sends an array of community objects
      // individual readings are nested in object.parameters
      setCommunityData(res.data.results);
      console.log('Res object: ', res);
    })
    .catch((err)=>{
      console.error(err);
    });
  },[queryUrl])

  return (
    <div className="app">
      <div className="app-content">
        <div className="app-top">
          <header>
            <h1>Air Quality</h1>
          </header>
          <p className="description">Local air quality data powered by OpenAQ API</p>
        </div>
        <UserForm
          queryValues={queryValues}
          setQueryValues={setQueryValues}
          setQueryUrl={setQueryUrl}
          baseUrl={baseUrl}
        ></UserForm>
        <DataDisplay
          communityData={communityData}
        ></DataDisplay>
      </div>
    </div>
  );
}

export default App;

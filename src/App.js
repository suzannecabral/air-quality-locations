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
    "radius":1610
  };
  
  // queryValues is an object with correctly formatted params ready for URl
  // queryUrl is used directly
  const baseUrl='https://docs.openaq.org/v2/locations?entity=community&country=US&has_geo=true';
  const defaultUrl=baseUrl + '&coordinates=' + defaultQueryValues.lat + ',' + defaultQueryValues.long + '&radius=' + defaultQueryValues.radius;

  const [queryValues, setQueryValues] = useState(defaultQueryValues);
  const [queryUrl, setQueryUrl] = useState(defaultUrl);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [communityData, setCommunityData] = useState([]);

  useEffect(()=>{

    axios.get(queryUrl)
    .then((res)=>{
      // res.data.results sends an array of community objects
      // individual readings are nested in object.parameters
      setCommunityData([...res.data.results]);
      console.log('Res object: ', res);
      console.log('App State data:', communityData);
    })
    .catch((err)=>{
      setError(true);
      setErrorMsg(err);
      console.error(err);
    });
  },[])

  return (
    <div className="app">
      <div className="app-content">
        <div className="app-top">
          <header>
            <h1>Air Quality</h1>
          </header>
          <p className="description">Local air quality data powered by OpenAQ API</p>
          {error ? <p role="alert" className="error">Server Error: {errorMsg} </p> : <p></p>}
        </div>
        <UserForm
          queryValues={queryValues}
          setQueryValues={setQueryValues}
        ></UserForm>
        <DataDisplay
          communityData={communityData}
        ></DataDisplay>
      </div>
    </div>
  );
}

export default App;

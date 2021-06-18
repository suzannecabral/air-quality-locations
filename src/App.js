import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DataDisplay from './components/DataDisplay';

function App() {

  let urlParams = '?entity=community&country=US&has_geo=true&coordinates=37.9952,-122.0406&radius=5000';

  // use json to lookup coords for user input zip code
  // query coordinates are gps latitude, longitude

  // query uses meters for radius distance
  // miles to meters: 1:1609.34
  const milesToMeters = (miles) => {
    const meters = miles * 1609.34;
    return (Math.ceil(meters));
  }

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [apiUrl, setApiUrl] = useState('https://docs.openaq.org/v2/locations');
  const [communityData, setCommunityData] = useState([]);

  useEffect(()=>{

    axios.get(apiUrl + urlParams)
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
        <DataDisplay
          communityData={communityData}
        ></DataDisplay>
      </div>
    </div>
  );
}

export default App;

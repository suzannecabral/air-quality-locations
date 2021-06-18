import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DataDisplay from './components/DataDisplay';

function App() {

  let apiUrl = 'https://docs.openaq.org/v2/locations'
  let urlParams = '?entity=community&country=US&order_by=city';

  let [error, setError] = useState(false);
  let [errorMsg, setErrorMsg] = useState('');
  let [communityData, setCommunityData] = useState([]);

  useEffect(()=>{

    axios.get(apiUrl + urlParams)
    .then((res)=>{
      // res.data.results sends an array of community objects
      // individual readings are nested in object.parameters
      setCommunityData([...res.data.results]);
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
        <header>
          <h1>Air Quality</h1>
        </header>
        <p>Description/intro will go here</p>
        {error ? <p role="alert" className="error">Server Error: {errorMsg} </p> : <p></p>}
        <DataDisplay
          communityData={communityData}
        ></DataDisplay>
      </div>
    </div>
  );
}

export default App;

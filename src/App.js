import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  let apiUrl = 'https://docs.openaq.org/v2/locations'
  let urlParams = '?entity=community&country=US&order_by=city';

  let [apiData, setApiData] = useState({});


  useEffect(()=>{

    axios.get(apiUrl + urlParams)
    .then((res)=>{
      // if searching by community
      // res.data.results sends an array of objects
      // individual readings are nested in community object

      console.log(res.data.results);
      // setApiData(res.data.results);
      // console.log(apiData);
    

    })
    .catch((err)=>{
      console.error(err)
    });

    console.log('Api url: ', apiUrl + urlParams);


  },[apiUrl,urlParams])

  return (
    <div className="app">
      <h1>Air Quality</h1>
      <p>App data will go here</p>
    </div>
  );
}

export default App;

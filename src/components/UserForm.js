import React from 'react';
import { useEffect, useState } from 'react';
import zipObjs from '../zip-lat-long.json';

const UserForm = (props) => {
    const { queryValues, setQueryValues, baseUrl, setQueryUrl } = props;

    const defaultFormValues={
        "radius":5,
        "zipcode":''
    };
    // url format: 
    // &coordinates=37.5341,-122.2473&radius=8047

    // query uses meters for radius distance
    // miles to meters: 1:1609.34
    const milesToMeters = (miles) => {
        const meters = miles * 1609.34;
        return (Math.ceil(meters));
    }
    
    // queryValues format:
    // {
    //     "lat":37.5341,
    //     "long":-122.2473,
    //     "radius":1610
    // };

    // use json to lookup coords for user input zip code
    let validatedZip = null;
    const searchCoords = (userZip) => {
        let coordsObj = zipObjs.filter(obj=>obj.ZIP===userZip);
        console.log('Coordinates found: ', coordsObj);
        // set parameters for url
        setQueryValues({...queryValues,
            "lat":Number(coordsObj[0].LAT.toFixed(4)),
            "long":Number(coordsObj[0].LNG.toFixed(4)),
            "radius":milesToMeters(formValues.radius)
        });
        // set api URL to be searched
        setQueryUrl(baseUrl + '&coordinates=' + queryValues.lat + ',' + queryValues.long + '&radius=' + queryValues.radius);
    }

    // form state and validation
    const [ formValues, setFormValues ] = useState(defaultFormValues);
    const [ errorMsg, setErrorMsg ] = useState('');

    // create an array of valid US zipcodes
    const zipList = zipObjs.map((obj)=>{
        return obj.ZIP;
    });

    const validateZip = (userZip) =>{
        let searchZip = 0;
        if (userZip[0] != '0'){
            // If zip starts dosen't start with 0, convert to num
            // zips that start with 0 are formatted as strings in search list
            // the rest are numbers
            searchZip = Number(userZip);
        }else{
            searchZip = userZip;
        }
        // search for zip in list
        // returns true if found
        if(zipList.includes(searchZip)){
            setErrorMsg('');
            validatedZip = searchZip;
            console.log('Valid zip code: ', searchZip);
            searchCoords(validatedZip);
            return true;
        }else{
            setErrorMsg('Invalid Zip Code');
            console.log('Invalid zip code: ', searchZip);
            return false;
        }
    }

    const onChange = (e)=>{
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        console.log('Search form submitted');
        validateZip(formValues.zipcode);
    }

    useEffect(()=>{
    },[zipList]);

    return(
        <div className="user-form">
            <p>Select a location to view air quality measurements:</p>
            <form onSubmit={onSubmit}>
                <label>Zip Code:
                    <input 
                        type="text" 
                        placeholder="Zip Code"
                        name="zipcode"
                        onChange={onChange}
                    />
                    
                </label>
                <label>Radius:
                    <select
                        name="radius"
                        // value={formValues.radius}
                        onChange={onChange}
                    >
                        <option value="5">5 mi</option>
                        <option value="10">10 mi</option>
                        <option value="15">15 mi</option>
                        <option value="20">20 mi</option>
                        <option value="30">30 mi</option>
                    </select>
                </label>
                <button type="submit">Search</button>
                <p className="error">&nbsp;{errorMsg}</p>
            </form>
        </div>
    );
}

export default UserForm;
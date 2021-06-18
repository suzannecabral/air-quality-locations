import React from 'react';
import { useEffect, useState } from 'react';
import zipObjs from '../zip-lat-long.json';

const UserForm = (props) => {
    const { apiUrl, setApiUrl } = props;

    const [ formData, setFormData ] = useState({
        "radius":0,
        "zipcode":''
    });

    const zipList = zipObjs.map((obj)=>{
        return obj.ZIP;
    });

    const validateZip = (userZip) =>{
        let searchZip = 0;
        if (userZip[0] != '0'){
            // If zip starts dosen't start with 0, convert to num
            searchZip = Number(userZip);
        }else{
            searchZip = userZip;
        }
        // search for zip in list
        // returns true if found
        return zipList.includes(searchZip)
    }

    useEffect(()=>{
        console.log(validateZip('94520'));
    },[zipList]);

    return(
        <div className="user-form">
            <p>Select a location to view air quality measurements:</p>
            <form>
                <label>Zip Code:
                    <input type="text" placeholder="Zip Code" />
                </label>
                <label>Radius:
                    <select>
                        <option>5 mi</option>
                        <option>10 mi</option>
                        <option>15 mi</option>
                        <option>20 mi</option>
                        <option>30 mi</option>
                    </select>
                </label>
            </form>
        </div>
    );
}

export default UserForm;
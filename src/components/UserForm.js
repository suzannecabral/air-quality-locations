import React from 'react';
import { useEffect, useState } from 'react';

const UserForm = (props) => {
    const { apiUrl, setApiUrl } = props;

    const [ formData, setFormData ] = useState({
        "radius":0,
        "zipcode":''
    });

    useEffect(()=>{

    },[]);

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
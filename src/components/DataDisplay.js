import React from 'react';
import { useEffect, useState } from 'react';


// Needs communityData, error, errorMsg
// later add loader status and graphic
const DataDisplay =(props)=> {

    const { communityData } = props;

    const [displayData, setDisplayData] = useState([]);

    const filterForDisplay = (arr) => {
        // create a copy of api data to transform
        const copiedArr = JSON.parse(JSON.stringify(arr));

        // filter:
        // must have at least 1 measurement (ceil) > 0.000 using micrograms/m3

        // reduce:
        // keep data for highest measurement (by parameter.average)
        /*{
            communityName: Smallville
            communityId: 71900
            maxParam:{
                average: 2.57801003344482
                unit: µg/m³
                displayName: PM10
                id: 420988
            }
        }*/
        const findMaxParam = (arr) => {
            return arr.reduce((acc,cur)=>{
                if (cur.average > acc.average){
                    acc = cur
                };
                return acc;
            })
        }
        const newArr = copiedArr.map((comm)=>{
            let maxParam = findMaxParam(comm.parameters);
            return(
                { 
                    "communityName": comm.name,
                    "communityId": comm.id,
                    /*"maxParam":{
                        "average": 2.57801003344482,
                        "unit": "µg/m³",
                        "type": "PM10",
                        "id": 420988
                    }*/
                    "maxParam": maxParam,
                }
            )
        });
        return newArr;
    }

    // var maxB = a.sort((a,b)=>b.y-a.y)[0].y;   


    useEffect(()=>{
        // transform community data before setting to display
        setDisplayData(filterForDisplay(communityData));
        console.log("Display Data: ", displayData);
    },[props]);

    return(
        <div className='data-display'>
            <div className='data-description'>
            </div>
            <div className="data-list">
                
                {
                    displayData.map((obj, idx)=>{
                    return (
                    <div key={'comm'+idx} className='community'>
                        <p className="community-name">{obj.communityName}</p>
                        <p className={obj.maxParam.average >= 5 ? 'red' : 'green' }>{obj.maxParam.average + ' ' + obj.maxParam.unit + ' ' + obj.maxParam.displayName}</p>
                    </div>
                    )
                    })
                }
            </div>
        </div>
    );
}

export default DataDisplay;
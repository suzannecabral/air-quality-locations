import React from 'react';
import { useEffect, useState } from 'react';


// Needs communityData, error, errorMsg
// later add loader status and graphic
const DataDisplay =(props)=> {

    const { communityData } = props;

    const [displayData, setDisplayData] = useState([]);

    const filterForDisplay = (arr) => {
        // must have at least 1 measurement using micrograms/m3

        // add keys: maxParamAvg | maxParamUnit | maxParamType | maxParamId
        // take max measurement average: record measurement, unit and type
        // maxParamId is the id of the measurement object, not the server's "parameterId"
        /*{
            communityName: Smallville
            communityId: 1234
            maxParamAvg: 0.065
            maxMaramUnit: µg/m³
            maxParamType: PM2.5
            maxParamId: 5678
        }*/
    }

    useEffect(()=>{
        // transform community data before setting to display
        setDisplayData([...communityData]);
        console.log("Display Data: ", displayData);
    },[props]);

    return(
        <div className='data-display'>
            <div className='data-description'>
            </div>
            <div className="data-list">
                {
                    

                    // communityData.map((obj, idx)=>{
                    // return (<div key={'obj'+idx} className='community'><p className="community-name">{obj.name}</p>  
                    //     {
                    //         obj.parameters.map((param,idx)=>{
                    //             return(<p key={'param'+idx}  className={param.unit === "µg/m³" && param.average > 0 && param.average < 5 ? 'targetAQ' : ''}> { (Math.ceil(param.average * 1000)/1000).toFixed(3)+ ' ' + param.unit + ' ' + param.parameter}</p>);
                    //         })
                    //     }
                    // </div>)
                    // })
                }
            </div>
        </div>
    );
}

export default DataDisplay;
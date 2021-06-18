import React from 'react';
import { useEffect } from 'react';


// Needs communityData, error, errorMsg
// later add loader status and graphic
const DataDisplay =(props)=> {

    const { communityData } = props;

    useEffect(()=>{
        console.log("Data display updated");
        console.log("Data display props: ", props);
    },[props]);

    return(
        <div className='data-display'>
            <div className='data-description'>
                <p>The Data Display component lives here</p>
            </div>
            <div className="data-list">
                {
                    communityData.map((obj, idx)=>{
                    return (<div key={'obj'+idx} className='community'><p className="community-name">{obj.name}</p>  
                        {
                            obj.parameters.map((param,idx)=>{
                                return(<p key={'param'+idx}> { (Math.round(param.average * 1000)/1000).toFixed(3)+ ' ' + param.unit + ' ' + param.parameter}</p>);
                            })
                        }
                    </div>)
                    })
                }
            </div>
        </div>
    );
}

export default DataDisplay;
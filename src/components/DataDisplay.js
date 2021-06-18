import React from 'react';


// Needs apiData, error, errorMsg
// later add loader status and graphic
const DataDisplay =(props)=> {
    return(
        <div className='data-display'>
            <p>The Data Display component lives here</p>
            <p role="alert">This is an error message</p>
            <p>This is some text about the data</p>
        </div>
    );
}

export default DataDisplay;
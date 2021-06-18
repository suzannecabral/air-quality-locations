import React from 'react';


// Needs apiData, error, errorMsg
// later add loader status and graphic
const DataDisplay =(props)=> {
    return(
        <div className='data-display'>
            <div className='data-description'>
                <p>The Data Display component lives here</p>
                <p role="alert" className="error">This is an error message</p>
            </div>
            <div class="data-list">

            </div>
        </div>
    );
}

export default DataDisplay;
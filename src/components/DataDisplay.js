import React from "react";
// import { useEffect, useState } from 'react';
// import { PropTypes } from 'prop-types';
// import { displayMax } from '../utils/displayMax';

const DataDisplay = ({ displayData }) => {
	return (
		<div className="data-display">
			<div className="data-description"></div>
			<div className="data-list">
				{displayData.map((obj, idx) => {
					return (
						<div key={"comm" + idx} className="community">
							<p className="community-name">{obj.communityName}</p>
							<p className={obj.meetsGoalAQ ? "green" : "red"}>
								{obj.maxParam.average +
									" " +
									obj.maxParam.unit +
									" " +
									obj.maxParam.displayName}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

// DataDisplay.propTypes = {
//     communityData: PropTypes.array
// };

export default DataDisplay;

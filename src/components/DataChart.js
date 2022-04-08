import React from "react";
import { makeStyles } from "@material-ui/core";
import { Scatter /*, Bubble, Chart, Bar*/ } from "react-chartjs-2";
// import { PropTypes } from "prop-types";

const useStyles = makeStyles({
	root: {
		maxWidth: "50rem",
		maxHeight: "20rem",
		margin: "1rem",
	},
});

const DataChart = ({ displayData }) => {
	const classes = useStyles();

	// const rand = () => Math.round(Math.random() * 20);
	console.log("display data", displayData);

	const airDataset = displayData.map((location) => {
		return {
			x: location.pm10.lastValue,
			y: location.pm25.lastValue,
		};
	});

	const airData = {
		datasets: [
			{
				label: "Community Readings",
				data: airDataset,
				backgroundColor: "rgba(130, 179, 201, 1)",
			},
		],
	};

	const airOptions = {
		// maintainAspectRatio: false,
		title: {
			display: true,
			text: "Air Quality Data by Location",
		},
		scales: {
			y: {
				display: true,
				title: {
					display: true,
					text: "PM 2.5",
				},
			},
			x: {
				display: true,
				title: {
					display: true,
					text: "PM10",
				},
			},
		},
	};

	// const loadAirData = () => {
	//   let airDataSet=[];
	//   displayData.map();
	//   console.log('Air data loaded test');
	//   console.log('displayData: ', displayData);
	// }

	// React.useEffect(() => {
	//   loadAirData();
	// }, [displayData]);

	return (
		<div>
			<Scatter data={airData} options={airOptions} className={classes.root} />
		</div>
	);
};

// DataChart.propTypes = {

// }

export default DataChart;

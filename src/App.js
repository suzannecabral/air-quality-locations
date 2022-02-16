import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";
// import SearchIcon from '@material-ui/icons/Search';

// import DataDisplay from "./components/DataDisplay";
import DataChart from "./components/DataChart";
import UserForm from "./components/UserForm";
// import { displayMax } from './utils/displayMax';
import { displayDensity } from "./utils/displayDensity";

const theme = createTheme({
	palette: {
		primary: {
			main: lightBlue[100],
		},
		secondary: {
			main: "#82b3c9",
		},
	},
});

const useStyles = makeStyles({
	header: {
		marginTop: "1rem",
	},
	description: {
		marginBottom: "0.4rem",
		// border: "1px solid red",
	},
});

function App() {
	const classes = useStyles();
	// url format:
	// query coordinates are gps latitude, longitude
	// radius is in meters
	// &coordinates=37.5341,-122.2473&radius=8047
	// zip is a string

	// const goalAQ = 5;

	const defaultQueryValues = {
		lat: 37.5341,
		long: -122.2473,
		radius: 8047,
		zip: "0",
	};

	// queryValues is an object with correctly formatted params ready for URl
	// queryUrl is used directly
	const baseUrl =
		"https://docs.openaq.org/v2/locations?entity=community&country=US&has_geo=true";
	const defaultUrl =
		baseUrl +
		"&coordinates=" +
		defaultQueryValues.lat +
		"," +
		defaultQueryValues.long +
		"&radius=" +
		defaultQueryValues.radius;

	const [queryValues, setQueryValues] = useState(defaultQueryValues);
	const [queryUrl, setQueryUrl] = useState(defaultUrl);
	const [communityData, setCommunityData] = useState([]);
	const [displayData, setDisplayData] = useState([]);
	const [loading, setLoading] = useState(true);

	// TODO: server status error state & messages using MUI

	useEffect(() => {
		axios
			.get(queryUrl)
			.then((res) => {
				// res.data.results sends an array of community objects
				// individual readings are nested in object.parameters
				setCommunityData(res.data.results);
				setDisplayData(displayDensity(res.data.results));
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [queryUrl]);

	// to show maximum measurement taken at a location:
	// displayMax(communityData, goalAQ)

	// to show PM2.5 and PM10 density for each location:
	// displayDensity(communityData)

	useEffect(() => {}, [communityData]);

	return (
		<div className="app">
			<ThemeProvider theme={theme}>
				<div className="app-content">
					<div className="app-top">
						<header>
							<AppBar position="fixed">
								<Toolbar>
									{/* <Typography variant="paragraph" color="secondary" display="block">asdf</Typography> */}
									<Typography variant="h4" className={classes.header}>
										Air Quality
									</Typography>
								</Toolbar>
							</AppBar>
							{/* <h1>Air Quality</h1> */}
						</header>
						<Typography className={classes.description} variant="paragraph">
							Local air quality data powered by OpenAQ
						</Typography>
						<Typography variant="caption" display="block">
							Showing {communityData.length < 100 ? "all" : "first"}{" "}
							{communityData.length} results for zip
							{" " + queryValues.zip}
						</Typography>
					</div>
					<UserForm
						queryValues={queryValues}
						setQueryValues={setQueryValues}
						setQueryUrl={setQueryUrl}
						baseUrl={baseUrl}
					></UserForm>
					{!loading && displayData.length > 0 && (
						<DataChart displayData={displayData} />
					)}
					{/* {!loading && displayData.length > 0 && (
						<DataDisplay displayData={displayData} />
					)} */}
				</div>
			</ThemeProvider>
		</div>
	);
}

export default App;

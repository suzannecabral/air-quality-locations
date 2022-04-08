// query uses meters for radius distance
// miles to meters: 1:1609.34
const milesToMeters = (miles) => {
    const meters = miles * 1609.34;
    return (Math.ceil(meters));
}

export default milesToMeters;
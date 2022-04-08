export const displayDensity = (communityData) => {
  return communityData.map(location => {
    let locationData={
      "maxParam": "",
      "id": location.id,
      "displayName": location.name,
      "pm25": location.parameters[4],
      "pm10": location.parameters[5],
    };
    
    return(
      locationData
    )
  });
};
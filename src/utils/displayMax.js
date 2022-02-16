
// transform community data before setting to display
export const displayMax = (communityData, goalAQ) => {
// create a copy of api data to transform
const copiedArr = JSON.parse(JSON.stringify(communityData));

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
    },
    meetsGoalAQ: true
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
            "meetsGoalAQ": maxParam.average < goalAQ
        }
    )
});
return newArr;
};
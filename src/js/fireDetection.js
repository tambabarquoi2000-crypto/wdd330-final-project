import { headerFooter } from "./utils.mjs";
import { getData } from "./ExternalServices.mjs";
import "../css/global.css";
headerFooter()

const fireDetections = "https://kanari.io/api/events?hours=24";

const recentActivitiees =  await getData(fireDetections);

const limit = 50;
const limit50Acts = [];

executeAPI();


async function executeAPI()
{
    for (let i = 0; i < limit; i++)
{
    limit50Acts.push(recentActivitiees.events[i]);
}

// console.log(limit50Acts);

const htmlStrings =  await Promise.all(limit50Acts.map(act => createCard(act)));

console.log(htmlStrings);

const actList = document.getElementById("fire-acty");
console.log(actList);


actList.insertAdjacentHTML("afterbegin", htmlStrings.join(""))


}



async function createCard(obj){
    const [lon, lat] = obj.centroid
    // console.log(`Lat: ${lat}`, `Lon: ${lon}`)

    // const placeObj = await getPlaceName(lon, lat)

    return(
        `
            <li class="card">
                <div>
                    <h2>Longitude ${lon} - Latitude: ${lat}</h2>
                </div>
                <div>
                    <p>Confidence: ${obj.confidence}</p>
                    <p>First Detected: ${obj.firstSeen}</p>
                    <p>Last Detected: ${obj.lastSeen}</p>
                    <p>Recorded Observations: ${obj.count}</p>
                    <p>Maximum Frequency: ${Math.ceil(obj.maxFrp)}</p>

                </div>
            </li>
        `
    )
}


async function getPlaceName(lon, lat)
{
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    const placeObj = await getData(url);

    // console.log(placeObj);
    
    return(placeObj)
}

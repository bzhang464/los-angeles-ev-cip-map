// --- (1), (2) & (3): install and import ---
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ev_chargers from '../data/ev_chargers.json';
import cip from '../data/cip_projects.json'
import {GeometryUtils} from '../utils/geometryUtils';
import L from 'leaflet';
// --- ---------------------------------- ---

export function Map() {
  // LA coordinates
  const position = [34.05, -118.24]
   
  var gu = new GeometryUtils();
  //console.log("here");
  var chargeData = ev_chargers;
  var cipData = cip;

  // --- (6) Create a custom marker ---
  const normalIcon = new Icon({
    iconUrl: '/blue.png',
    iconSize: [3, 3],
    iconAnchor: [1, 1],
    popupAnchor: [-0, -76]
  })

  const specialIcon = new Icon({
    iconUrl: '/red.png',
    iconSize: [10, 10],
    iconAnchor: [1, 1],
    popupAnchor: [-0, -76]
  })

  return (
    <section className='map-component' >
      {/* --- (5) Add leaflet map container --- */}
      <div className='map'>
      <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // --- (7) Alternative map style (attribution and url copied from the leaflet extras website) ---
          // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          // url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          // --- -------------------------------------------------------------------------------------- ---
        />



        {cipData.features.map((proj) => {     
           //console.log("Entered polygons");                 
           // Return the element. Also pass key
           var coords = [];
           for (var value of proj.geometry.coordinates[0]) {
               if (value == null) {
                return;
               }
               coords.push(value);
           }
           for (var arr of coords) {
               var temp = arr[0];
               arr[0] = arr[1];
               arr[1] = temp;
           }

           //console.log(coords);
           gu.addPolygon(L.polygon(coords))
           //gu.addPolygon(coords);
           //console.log(gu.polygons);
           return <Polygon positions = {coords}  color = {'green'}/>  
        })}


        {chargeData.features.map((charger) => {     
           //console.log("Entered chargers");                 
           // Return the element. Also pass key
           //console.log(gu.polygons.length);
           var place = []
           for (var value of charger.geometry.coordinates) {
              place.push(value);
           }
           var temp = place[0];
           place[0] = place[1];
           place[1] = temp;
           var mark = L.marker(place);
           //console.log(place);
           //console.log(gu.polygons);
           if (gu.isMarkerInsideAPolygon(mark)) {
              //console.log('true');
              return <Marker position={[place[0], place[1]]} icon = {specialIcon}/>
           } else {
              //console.log('false')
              //return "hi";
              return <Marker position={[place[0], place[1]]} icon = {normalIcon}/> 
           }
           //console.log(place);
            //return <Marker position={[place[1], place[0]]} icon = {customIcon}></Marker>    
        })}
      </MapContainer>
      {/* --- ---------------------------- --- */}
      </div>
    </section>
  )
}
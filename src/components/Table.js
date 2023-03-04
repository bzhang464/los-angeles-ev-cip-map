// --- (1), (2) & (3): install and import ---
import ev_chargers from '../data/ev_chargers.json';
import cip from '../data/cip_projects.json'
import {GeometryUtils} from '../utils/geometryUtils';
import L from 'leaflet';
// --- ---------------------------------- ---

export function Table() {
  // Downtown LA coordinates
  //const position = [34.05, -118.24]
  var seen = new Set();
  var gu = new GeometryUtils();
  //console.log("here");
  var chargeData = ev_chargers;
  var cipData = cip;
  //console.log(cipData);
  return (
    <section>
        <div>
    <table className="form__table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th colSpan={2}>EV Chargers</th>
            </tr>
        </thead>
        <tbody>
        {
            cipData.features.map((proj) => {
              if (seen.has(proj.properties.ProjectTitle)) {
                //console.log('duplicate');
                return;
              }
              seen.add(proj.properties.ProjectTitle);
              var chargeCount = 0;
              var coords = [] 
            //   [proj.geometry.coordinates[1], proj.geometry.coordinates[0]];
              for (var value of proj.geometry.coordinates) {
                if (value[0] == null || value[1] == null) {
                    return;
                }
                coords.push(value);
              }
                for (var arr of coords) {
                    var temp = arr[0];
                    arr[0] = arr[1];
                    arr[1] = temp;
                }
              //console.log(polygon);

              for (var charger of chargeData.features) {
                var place = []
                for (var value of charger.geometry.coordinates) {
                    place.push(value);
                }
                var temp = place[0];
                place[0] = place[1];
                place[1] = temp;
                // console.log(place);
                if (gu.isMarkerInsidePolygon(L.marker(place), L.polygon(coords))) {
                    console.log("here");
                    chargeCount += 1;
                }
              }
            //   console.log('charge #' + chargeCount);
            //   if (chargeCount === 5) {
            //     console.log(proj.id);
            //   }
              
              return <tr className="form__table-row">
                <td>{proj.id}</td>
                <td>{proj.properties.ProjectTitle}</td>
                <td>{chargeCount+ " Chargers"}</td>
              </tr>
            })
        }
        </tbody>
    </table>
        </div>
    </section>
  )
}
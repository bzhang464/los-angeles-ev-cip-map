export class GeometryUtils {
    
    constructor() {
        this.polygons = []
    }

    addPolygon(polygon) {
        this.polygons.push(polygon);
    }

    isMarkerInsideAPolygon(marker) {
        for (var polygon of this.polygons) {
            if (this.isMarkerInsidePolygon(marker, polygon)) {
                return true;
            }
        }
        return false;
    }

    isMarkerInsidePolygon(marker, poly) {
        var inside = false;
        var x = marker.getLatLng().lat, y = marker.getLatLng().lng;
        for (var ii=0;ii<poly.getLatLngs().length;ii++){
            var polyPoints = poly.getLatLngs()[ii];
            for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
                var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
                var xj = polyPoints[j].lat, yj = polyPoints[j].lng;
    
                var intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
        }
    
        return inside;
    };
    
}
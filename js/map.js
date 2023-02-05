
mapboxgl.accessToken = 'pk.eyJ1IjoiY3liZXJjYXQiLCJhIjoiY2xkbjNudWNvMGZpeTNwb3NpdXU3a3V6ciJ9.tdHX8TjZpQm9yGHvg_abBQ'

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, 
    {enableHighAccuracy: true})

function successLocation(position){
    setupMap([position.coords.longitude, position.coords.latitude])
}
function errorLocation(){
    setupMap([1.3521, 103.8198])
}

function setupMap(center)
{
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 9,
    });

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    })
    map.addControl(directions,"top-left")

    map.on('load', () => {
        // Add the vector tileset as a source.
        map.addSource('ethnicity', {
        type: 'vector',
        url: 'mapbox://examples.8fgz4egr'
        });
        map.addLayer(
            {
            'id': 'population',
            'type': 'circle',
            'source': 'ethnicity',
            'source-layer': 'sf2010',
            'paint': {
            // Make circles larger as the user zooms from z12 to z22.
            'circle-radius': {
            'base': 1.75,
            'stops': [
            [12, 2],
            [22, 180]
            ]
            },
            // Color circles by ethnicity, using a `match` expression.
            'circle-color': [
            'match',
            ['get', 'ethnicity'],
            'White',
            '#fbb03b',
            'Black',
            '#223b53',
            'Hispanic',
            '#e55e5e',
            'Asian',
            '#3bb2d0',
            /* other */ '#ccc'
            ]
            }
            },
            // Place polygons under labels, roads and buildings.
            'aeroway-polygon'
            )
        })
}
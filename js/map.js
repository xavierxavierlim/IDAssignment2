
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
}

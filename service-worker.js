importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')
const API_PREFIX = "https://api.football-data.org/"

workbox.precaching.precacheAndRoute([
    {url:'/', revision: '1'},
    {url:'/manifest.json', revision: '1'},

    {url:'/index.html', revision: '1'},
    {url:'/pages/classement.html', revision: '1'},
    {url:'/pages/home.html', revision: '1'},
    {url:'/pages/team-information.html', revision: '1'},
    {url:'/pages/favorite-team.html', revision: '1'},
    
    {url:'/css/materialize.min.css', revision: '1'},
    {url:'/css/style.css', revision: '1'},

    {url:'/js/materialize.min.js', revision:'1'},
    {url:'/js/api.js', revision:'1'},
    {url:'/js/nav.js', revision:'1'},
    {url:'/js/classement.js', revision:'1'},
    {url:'/js/team-information.js', revision:'1'},
    {url:'/js/db.js', revision:'1'},
    {url:'/js/favorite-team.js', revision:'1'},
    {url:'/js/idb.js', revision:'1'},
    {url:'/js/initServiceWorker.js', revision:'1'},

    {url:'/img/bg-home.jpg', revision:'1'},
    {url:'/img/logo_bundesliga.png', revision:'1'},
    {url:'/img/logo_cl.png', revision:'1'},
    {url:'/img/logo_premier_league.png', revision:'1'},
    {url:'/img/errorImage.png', revision:'1'},
    {url:'/img/icons/icon-72x72.png', revision:'1'},
    {url:'/img/icons/icon-96x96.png', revision:'1'},
    {url:'/img/icons/icon-128x128.png', revision:'1'},
    {url:'/img/icons/icon-144x144.png', revision:'1'},
    {url:'/img/icons/icon-152x152.png', revision:'1'},
    {url:'/img/icons/icon-192x192.png', revision:'1'},
    {url:'/img/icons/icon-384x384.png', revision:'1'},
    {url:'/img/icons/icon-512x512.png', revision:'1'},
    {url:'/img/icons/icon-apple-192x192.png', revision:'1'},

    {url:'https://fonts.googleapis.com/icon?family=Material+Icons', revision:'1'},
])

workbox.routing.registerRoute(
    new RegExp('^https://api\\.football-data\\.org/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api-football-data',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
)

self.addEventListener('push', function (event) {
    let body

    if (event.data) {
        body = event.data.text()
    } else {
        body = "Push Message no payload!"
    }

    let options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})
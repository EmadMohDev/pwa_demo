 // the name of the cashe
 const staticDevCoffee = "dev-coffee-site-v1"

 // the assets to store in the cache.
 const assets = [
     "/",
     "./index.html", //  we add . if we deploy on sub doamin
     "./css/style.css",
     "./js/app.js",
     "./images/coffee1.jpg",
     "./images/coffee2.jpg",
     "./images/coffee3.jpg",
     "./images/coffee4.jpg",
     "./images/coffee5.jpg",
     "./images/coffee6.jpg",
     "./images/coffee7.jpg",
     "./images/coffee8.jpg",
     "./images/coffee9.jpg",
 ]


 // add assets to cache before install 
 self.addEventListener("install", installEvent => {
     installEvent.waitUntil(
         caches.open(staticDevCoffee).then(cache => {
             return cache.addAll(assets)
         })
     )
 })



 /*
 - install event. It runs when a service worker is installed. It's triggered as soon as the worker executes, and it's only called once per service worker.
 - Caching something on the browser can take some time to finish because it's asynchronous.
So to handle it, we need to use waitUntil() which, as you might guess, waits for the action to finish.
*/





 //Fetch the assets that we cache during install 
 self.addEventListener("fetch", fetchEvent => {
     fetchEvent.respondWith(
         caches.match(fetchEvent.request).then(res => {
             return res || fetch(fetchEvent.request)
         })
     )
 })

 /*
 -  we attach respondWith() to prevent the browser's default response. Instead it returns a promise because the fetch action can take time to finish.
 - And once the cache ready, we apply the caches.match(fetchEvent.request). It will check if something in the cache matches fetchEvent.request. By the way, fetchEvent.request is just our array of assets.
Then, it returns a promise. And finally, we can return the result if it exists or the initial fetch if not.
 */
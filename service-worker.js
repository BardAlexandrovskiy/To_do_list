"use strict";var precacheConfig=[["/To_do_list/check.212bcd4e.png","e9b1c9012391d5a34ea755fcdd837548"],["/To_do_list/delete.44150cce.png","8b76bdca26f51ba2307c4f99267a7c9a"],["/To_do_list/icon-128x128.d0b365e1.png","8426a8bdbbe87708d40df7d064888b58"],["/To_do_list/icon-144x144.2d821cb0.png","827bc701d6f7d34c9595168ff5c604ce"],["/To_do_list/icon-152x152.13af858e.png","c8980a8dc1234d6769410af760dc0bb3"],["/To_do_list/icon-192x192.391e0d11.png","7fb6a3f3560649afdc71c71f471c2ff7"],["/To_do_list/icon-384x384.fc093969.png","aa957a81a5768630cc4485cf2a15d7c3"],["/To_do_list/icon-512x512.726e8e6f.png","db147903fc6cfae13446937eab60706f"],["/To_do_list/icon-72x72.9d41f735.png","5962138723ad9ff1cd85480b68dd237c"],["/To_do_list/icon-96x96.aed6cd87.png","64ee313c9dd58d3947e50f765d5506c4"],["/To_do_list/index.html","549b5aa764b36ea264fd449bb189fb69"],["/To_do_list/src.11529269.js","f3de40567115ec7bfd18c43c9eb917ed"],["/To_do_list/styles.7c09386e.css","fd705be35a8cb4c145dfec72fb094097"]],cacheName="sw-precache-v3-to_do_list-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,r){var c=new URL(e);return r&&c.pathname.match(r)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],r=new URL(t,self.location),c=createCacheKey(r,hashParamName,n,/\.\w{8}\./);return[r.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var r=new Request(n,{credentials:"same-origin"});return fetch(r).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL("/To_do_list/index.html",self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});
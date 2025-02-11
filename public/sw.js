self.addEventListener('install', function (event) {
  console.log('🚀 ~ event:', event)
})

self.addEventListener('activate', (event) => {
  console.log('🚀 ~ self.addEventListener ~ event:', event)
})

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', (event) => {
  console.log('🚀 ~ self.addEventListener ~ event:', event)
})

// let timeToLogOut = null

// setInterval(async () => {
//   const allClients = await self.clients.matchAll()
//   if (!allClients[0]) {
//     console.log('WINDOW CLOSED')

//     timeToLogOut = new Date()
//   }
// }, 1000)

// setInterval(async () => {
//   // console.log('🚀 ~ setInterval ~ allClients:', allClients[0])
//   // console.log('Hello world from the Service Worker 🤙')

//   if(timeToLogOut){

//   }
// }, 500)

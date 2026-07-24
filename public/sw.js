// Service worker: когда навигационный запрос к сайту падает, показываем
// одну из двух страниц в зависимости от причины:
//   - проблема с сертификатом Минцифры (интернет есть, а наш origin не
//     открывается по TLS) -> гайд по установке сертификатов;
//   - нет интернета вовсе -> страница «нет соединения».
//
// Сценарий с сертификатом: воркер устанавливается, пока сертификат валиден,
// и переживает его отзыв. SW и его кэш живут локально в браузере — при
// следующем открытии PWA браузер поднимает воркер из хранилища (а не из
// сети), тот перехватывает навигацию, сетевой fetch падает, и мы отдаём
// нужную закэшированную страницу вместо стандартного экрана ошибки браузера.

const CACHE = 'cert-guide-v2'
const GUIDE_URL = '/cert-guide.html'
const OFFLINE_URL = '/offline.html'

// Минимальные запасные варианты на случай, если страницы нет в кэше.
const FALLBACK_GUIDE = `<!doctype html><meta charset="utf-8"><title>Небезопасное соединение</title>
<body style="font-family:sans-serif;max-width:640px;margin:40px auto;padding:0 16px">
<h1>Не удаётся установить защищённое соединение</h1>
<p>Возможно, отсутствует или отозван корневой сертификат Минцифры России.
Установите сертификаты с портала Госуслуг и перезапустите браузер.</p>
<p><a href="https://www.gosuslugi.ru/crt">Скачать сертификаты на Госуслугах</a></p></body>`

const FALLBACK_OFFLINE = `<!doctype html><meta charset="utf-8"><title>Нет подключения</title>
<body style="font-family:sans-serif;max-width:640px;margin:40px auto;padding:0 16px;text-align:center">
<h1>Нет подключения к интернету</h1>
<p>Проверьте сеть и попробуйте снова.</p>
<button onclick="location.reload()">Повторить</button></body>`

// При установке прекэшируем обе страницы, пока соединение ещё работает.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll([
          new Request(GUIDE_URL, { cache: 'reload' }),
          new Request(OFFLINE_URL, { cache: 'reload' }),
        ])
      )
      .catch(() => {})
      .then(() => self.skipWaiting())
  )
})

// Чистим старые версии кэша и берём управление открытыми вкладками сразу.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

function pageResponse(url, fallbackHtml) {
  return caches.match(url).then(
    (cached) =>
      cached ||
      new Response(fallbackHtml, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
  )
}

const guideResponse = () => pageResponse(GUIDE_URL, FALLBACK_GUIDE)
const offlineResponse = () => pageResponse(OFFLINE_URL, FALLBACK_OFFLINE)

self.addEventListener('fetch', (event) => {
  const req = event.request
  const url = new URL(req.url)

  // Тест-хуки: принудительно показать нужную страницу без реального сбоя.
  if (url.searchParams.has('cert-guide')) {
    event.respondWith(guideResponse())
    return
  }
  if (url.searchParams.has('offline')) {
    event.respondWith(offlineResponse())
    return
  }

  // Обрабатываем только навигацию (загрузку HTML-страниц) в пределах origin.
  if (req.mode !== 'navigate' || url.origin !== self.location.origin) return

  event.respondWith(
    fetch(req).catch(() => {
      // Наша страница не загрузилась. Различаем причину по navigator.onLine:
      // онлайн, а наш origin не открылся -> проблема сертификата/TLS -> гайд.
      // офлайн -> нет соединения -> страница «нет интернета».
      const online = !self.navigator || self.navigator.onLine !== false
      return online ? guideResponse() : offlineResponse()
    })
  )
})

const GA_ID = 'G-MJN1642ZBW'

function loadGoogleAnalytics() {
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID
  document.head.appendChild(script)
}

function enableGoogleAnalytics() {
  window[`ga-disable-${GA_ID}`] = false

  loadGoogleAnalytics()

  // add gtag function
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  window.gtag = gtag

  // initialize google analytics
  gtag('js', new Date())
  gtag('config', GA_ID, { anonymize_ip: true })
}

function disableGoogleAnalytics() {
  window[`ga-disable-${GA_ID}`] = true

  // delete _ga* cookies
  const cookies = document.cookie.split(';')
  const gaCookiePattern = /^_ga/
  // const gaCookiePattern = /^_ga|^_gid|^_gat/
  cookies.forEach((cookie) => {
    const cookieName = cookie.trim().split('=')[0]

    if (gaCookiePattern.test(cookieName)) {
      document.cookie =
        cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }
  })
}

export default {
  enableGoogleAnalytics,
  disableGoogleAnalytics,
}

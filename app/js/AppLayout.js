import React, { useEffect, useState } from 'react'

import Header from './Header'
import Main from './Main'
import Context from './Context'
import ConsentBanner from './ConsentBanner'

import config from '../config.json'
const cookie_consent = config.cookie_consent

import ga from './util/ga'
import cookie from './util/cookie'

function checkCookieConsent() {
  const consent = cookie.get(cookie_consent.key)
  if (consent === undefined) {
    return false
  }
  return consent === 'true'
}

export default (_props) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cookieConsent, setCookieConsent] = React.useState(() => {
    return checkCookieConsent()
  })
  const [showBanner, setShowBanner] = useState(() => {
    const consent = cookie.get(cookie_consent.key)

    // if cookie_consent doesn't exist
    if (consent === undefined) {
      return true
    }

    // if cookie_consent does exist and its value is 'true' or 'false'
    if (consent === 'true' || consent === 'false') {
      return false
    }

    // if cookie_consent does exist and its value is invalid
    return true
  })

  useEffect(() => {
    if (checkCookieConsent()) {
      ga.enableGoogleAnalytics()
    } else {
      ga.disableGoogleAnalytics()
    }
  }, [])

  const handleAcceptCookies = () => {
    cookie.set(cookie_consent.key, 'true', cookie_consent.expiration_days)
    ga.enableGoogleAnalytics()

    setShowBanner(false)
    setCookieConsent(true)
  }

  const handleRefuseCookies = () => {
    cookie.set(cookie_consent.key, 'false', cookie_consent.expiration_days)
    ga.disableGoogleAnalytics()

    setShowBanner(false)
    setCookieConsent(false)
  }

  return (
    <Context.Provider
      value={{
        mobileOpen,
        setMobileOpen,
        showBanner,
        setShowBanner,
        handleAcceptCookies,
        handleRefuseCookies,
        cookieConsent,
        setCookieConsent,
      }}
    >
      <Header />
      <Main />
      <ConsentBanner />
    </Context.Provider>
  )
}

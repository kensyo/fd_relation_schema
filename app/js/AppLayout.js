import React, { useState } from 'react'

import Header from './Header'
import Main from './Main'
import Context from './Context'
import ConsentBanner from './ConsentBanner'

export default (_props) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Context.Provider value={{ mobileOpen, setMobileOpen }}>
      <Header />
      <Main />
      <ConsentBanner />
    </Context.Provider>
  )
}

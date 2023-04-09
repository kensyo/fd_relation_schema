import React, { useState } from 'react'

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Context from './Context'

export default (_props) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Context.Provider value={{ mobileOpen, setMobileOpen }}>
      <Header />
      <Main />
      <Footer />
    </Context.Provider>
  )
}

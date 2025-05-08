import React from 'react'
import './css/mainpage.css'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
    <Header />
      <main className="app__main">
        <Dashboard/>
      </main>
    </>
  )
}

export default App

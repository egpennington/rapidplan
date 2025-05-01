import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import Section1Incident from './components/Section1Incident'
import Section3Hazard from './components/Section3hazard'

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Section1Incident />
        <Section3Hazard />
      </main>     
    </>    
  )
}

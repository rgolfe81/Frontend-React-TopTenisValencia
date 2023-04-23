import "./App.css"
import { Header } from "./common/Header/Header"
import { Body } from "./pages/Body/Body"
import React from 'react'

export const App = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  )
}

import "./App.css"
import { Header } from "./common/Header/Header"
import { Body } from "./pages/Body/Body"
import { Footer} from "./common/Footer/Footer"

function App (){

  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

export default App


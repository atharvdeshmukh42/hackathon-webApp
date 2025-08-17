import Home from "./pages/Home"
import {Routes, Route} from 'react-router-dom'
import RegistrationForm from "./pages/RegistrationForm"
import PSPage from "./pages/PSPage"
import Loading from "./pages/Loading"
import RulesAndInfo from "./pages/RulesAndInfo"
import AboutUs from "../src/pages/AboutUs"
import DownloadTemplate from "./pages/DownloadTemplate"
import Result from "./pages/Result"
import ConfirmationPage from "./pages/ConfirmationPage"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Loading />}/>
      <Route path="/Home" element={<Home />}/>
      <Route path="/Register" element={<RegistrationForm />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/PS" element={<PSPage />} />
      <Route path="/DownloadTemplate" element={<DownloadTemplate />} />
      <Route path="/RulesAndInfo" element={<RulesAndInfo />} />
      <Route path="/Result" element={<Result />} />
      <Route path="/Confirmation" element={<ConfirmationPage />} />
    </Routes>
    </>
  )
}

export default App

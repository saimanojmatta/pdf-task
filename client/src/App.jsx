import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import UploadComponent from './components/UploadComponent'
// import Uploadform from './components/Uploadform'
function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<UploadComponent />}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/sign-in' element={<Signin/>} />
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

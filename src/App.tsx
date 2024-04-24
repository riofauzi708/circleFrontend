import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Home from './pages/Home'
import RootLayout from './layouts/RootLayout'
import Follows from './pages/Follows'
import Profile from './pages/Profile'
import Search from './pages/Search'
import DetailThread from './pages/DetailThreads'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<RootLayout/>}>
          <Route index element= {<Home/>} />
          <Route path='/search' element= {<Search id={0} username={''} fullname={''} email={''}/>} />
          <Route path='/follows' element= {<Follows/>} />
          <Route path='/profile' element= {<Profile/>} />
          <Route path='/detail/:threadId' element= {<DetailThread/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

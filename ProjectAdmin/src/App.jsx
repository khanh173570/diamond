import {Header} from './component/header/Header'
import {SideBar} from './component/Body/sidebar/SideBar'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <>
    <div>
      <Header />
    </div>
    <div className='d-flex' style={{backgroundColor:'white'}} >
      <div className='w-25'>
        <SideBar /> 
      </div>
      <div className='w-75  ps-4 fw-dark' style={{backgroundColor:'#abf0e3'}}>
        <Outlet />
      </div>
    </div>
  </>


  )
}

export default App;

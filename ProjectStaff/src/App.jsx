import Header from './component/Header/Header'
import { SideBar } from './component/Body/SideBar/SideBar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <Header />
      </div>
      <div className='d-flex' style={{backgroundColor:'#EDEDED'}} >
        <div className='w-25'>
          <SideBar /> 
        </div>
        <div className='w-75 mt-4 ps-4 fw-dark' style={{backgroundColor:'white'}}>
          <Outlet />
        </div>
      </div>
    </>

  )
}

export default App

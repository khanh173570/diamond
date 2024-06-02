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
        <div  style={{width:'20%'}}>
          <SideBar /> 
        </div>
        <div style={{backgroundColor:'white',width:'80%'}}>
          <Outlet />
        </div>
      </div>
    </>

  )
}

export default App

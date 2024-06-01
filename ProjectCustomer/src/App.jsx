import { Outlet } from 'react-router-dom';
import Footer from './component/Footer/Footer.jsx'
import Header from './component/Header/Header.jsx'

function App() {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="main">
       <Outlet/>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  )
}

export default App

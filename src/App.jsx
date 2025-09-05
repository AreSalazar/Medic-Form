
import RegisterComponent from './views/register/RegisterComponent' //Sin {} ya que lo estamos importando aquí, y en RegisterComponent lo exportamos
import { FormPatient } from './views/form/FormPatient';
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {

  return (
    <div>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterComponent />} />
          <Route path="/dashboard" element={<FormPatient />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

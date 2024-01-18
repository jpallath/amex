import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UsersTable } from './components/usersTable';
import {User} from "./components/user"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<UsersTable/>}/>
      <Route path="/users/:id" element={<User/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

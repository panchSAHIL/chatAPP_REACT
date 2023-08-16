import React from 'react'
import Register from "./pages/Register"
import Login  from "./pages/Login"
import SetAvatar  from "./pages/SetAvatar"
import Chat from "./pages/Chat"
import { BrowserRouter , Routes , Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
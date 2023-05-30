import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Banniere from "./components/Banniere.jsx";
import UserCard from "./components/UserCard.jsx";
import FormBlog from "./components/FormBlog.jsx";
function App() {
  const [name, setName] = useState('');

  const handleNameChange = (newName) => {
    console.log('nom: '+newName);
    setName(newName);
  };
  console.log('nom: '+name);
  return (
    <>
  <BrowserRouter>
    <Banniere name={name}/>
    <Routes>
      <Route path="/" element={<UserCard />} />
      <Route path="/liste_users" element={<UserCard />} />
      <Route path="/form_blog" element={<FormBlog onNameChange={handleNameChange} />} />
    </Routes>
  </BrowserRouter>
    </>
  );
}
export default App;
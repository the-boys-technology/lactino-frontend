import React from 'react'
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelecaoProdutoPage from './pages/SelecaoProdutoPage';
import GestaoLeitePage from './pages/GestaoLeitePage';
import GestaoLaticinioPage from './pages/GestaoLaticinioPage';


function App(): React.ReactElement {
  return (
  <>
    <Header></Header>
    <Router>
      <Routes>
        <Route path="/selecionar-produto" element={ <SelecaoProdutoPage /> }></Route>
        <Route path="/gerenciar-leite" element={ <GestaoLeitePage /> }></Route>
        <Route path="/gerenciar-laticinio" element={ <GestaoLaticinioPage /> }></Route>
      </Routes>
    </Router>
  </>
  )
}

export default App

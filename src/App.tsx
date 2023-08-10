import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './NavBar';
import './App.css';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <h1>My Fkn Blog</h1>
      <NavBar/>
      <div className='center'>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/articles" element={<ArticlesListPage/>} />
          <Route path="/articles/:articleId" element={<ArticlePage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>
      </div>
   </BrowserRouter>
  );
}

export default App;
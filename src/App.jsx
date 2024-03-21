import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css'

function App() {

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuote(); // Llama a fetchQuote() una vez al inicio
    const intervalId = setInterval(fetchQuote, 10000); // Llama a fetchQuote() cada 10 segundos
    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  async function fetchQuote() {
    try {
      setIsLoading(true);
      const response = await axios.get('https://quote-garden.onrender.com/api/v3/quotes/random');
      const responseData = response.data.data;
      const firstQuote = responseData[0];
      setQuote(firstQuote.quoteText);
      setAuthor(firstQuote.quoteAuthor);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching quote: ', error);
      setIsLoading(false);
    }
  }


  return (
    <div className="container">
      <img src="../public/Cat1.png" alt="Descripción de la imagen" />  
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="quote-container">
          <p className="quote">{quote}</p>
          <p className="author">{author}</p>
        </div>
      )}
    </div>
  );
}

export default App

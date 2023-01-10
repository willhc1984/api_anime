import { useEffect, useState } from 'react';
import './App.css';
import SearchInput from './Components/SearchInput';

const api = 'https://kitsu.io/api/edge/';

function App() {

  const [text, setText] = useState('');
  const [info, setInfo] = useState({});
  
  useEffect(() => {
    if(text){
      fetch(`${api}anime?filter[text]=${text}&page[limit]=10`)
      .then((response) => response.json())
      .then((response) => {
        setInfo(response);
        console.log(info);
      });
    }
  }, [text]);

  return (
    <div className="App">
      <h1>Animes</h1>
      <SearchInput value={text} onChange={(search) => setText(search)} />
      {info.data && (
        <ul className='animes-list'>
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle} />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
          
        </ul>
      )}
    </div>
  );
}

export default App;

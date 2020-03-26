import React, { useState } from 'react';
import './App.css';
import {parseHash} from './utils';

function App() {
  const hash = parseHash();
  const [people, setPeople] = useState([]);
  const [token, setToken] = useState(hash.id_token);
  const [peopleUrl, setPeopleUrl] = useState(process.env.REACT_APP_PEOPLE_URL);

  const handleClick = async () => {
    if (!token) {
      alert("Can't perform the request without authorization. \nLogin first.");
      window.location.replace(process.env.REACT_APP_LOGIN_URL);
      return;
    }

    try {
      const init = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await fetch(peopleUrl, init);
      const {data, event} = await response.json();
      data.push({'request made by': event.cognitoPoolClaims});
      setPeople(data);
    } catch (error) {
      alert(`Oops, something went wrong: \n${error}`);
      setToken('');
    }
  };

  const handleChangeToken = (event) => {
    setToken(event.target.value)
  };

  const handleChangePeopleUrl = (event) => {
    setPeopleUrl(event.target.value)
  };

  return (
    <div className="App">
      <header>
        <input type="text" value={peopleUrl} onChange={handleChangePeopleUrl} placeholder="People URL"/>
        <button onClick={handleClick}>Get People</button>
      </header>
      <pre>
        {JSON.stringify(people, null, 2)}
      </pre>
      <footer>
        <label htmlFor="token">Token</label>
        <input id="token" type="text" value={token} onChange={handleChangeToken} placeholder="Authorization Token"/>
      </footer>
    </div>
  );
}

export default App;

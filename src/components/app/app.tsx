import React from 'react';
import uuidv4 from 'uuid/v4';

const App: React.FC = () => {
  const {
    REACT_APP_MONZO_AUTH_URL = '',
    REACT_APP_CLIENT_ID = '',
    REACT_APP_REDIRECT_PATH = '',
    REACT_APP_SITE_URL = '',
  } = process.env;

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const uuid = uuidv4();

    const query = new URLSearchParams({
      client_id: REACT_APP_CLIENT_ID,
      redirect_uri: REACT_APP_SITE_URL + REACT_APP_REDIRECT_PATH,
      response_type: 'code',
      state: uuid,
    });

    window.location.href = `${REACT_APP_MONZO_AUTH_URL}/?${query}`;

    localStorage.setItem('state', uuid);
  };

  return (
    <button type="button" onClick={handleLoginClick}>
      Login
    </button>
  );
};

export default App;

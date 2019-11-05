import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const useQuery = () => new URLSearchParams(useLocation().search);

const Login: React.FC = () => {
  const uuid = localStorage.getItem('state');
  const query = useQuery();
  const code = query.get('code') || '';
  const state = query.get('state') || '';
  const history = useHistory();

  useEffect(() => {
    const getAccessToken = async () => {
      if (state !== uuid) {
        history.push('/');
        return;
      }

      if (!!sessionStorage.getItem('token')) {
        history.push('/accounts');
        return;
      }

      const {
        REACT_APP_CLIENT_ID = '',
        REACT_APP_SITE_URL = '',
        REACT_APP_REDIRECT_PATH = '',
        REACT_APP_API_URL = '',
      } = process.env;

      const query = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: REACT_APP_CLIENT_ID,
        redirect_uri: REACT_APP_SITE_URL + REACT_APP_REDIRECT_PATH,
        code,
      });

      try {
        const response = await fetch(`${REACT_APP_API_URL}/auth/token?${query}`);
        const { accessToken } = await response.json();

        sessionStorage.setItem('token', accessToken);

        history.push('/accounts');
      } catch (error) {
        throw new Error(error);
      }
    };

    getAccessToken();
  }, [code, history, state, uuid]);

  return null;

  // if (state !== uuid) {
  //   return <Redirect to="/" />;
  // }

  // return <Redirect to="/accounts" />;
};

export default Login;

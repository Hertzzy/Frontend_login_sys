import logo from '../../assets/logo.png';
import { api } from '../../services/api';
// import { useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

export default function Register() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password_hash, setPassword_hash] = useState('');

  const [loading, setLoading] = useState(true);
  const [startTimeout, setStartTimeout] = useState(true);
  const [message, setMessage] = useState("");
  
  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(!loading);

    try {
      const response = await login(email, password_hash);
      const user = response.data.user;
      const token = response.data.token;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      api.defaults.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      const loadingTimer = setTimeout(() => {
        setStartTimeout(false);
        setLoading(loading)
          if(error.response) {
            setMessage(error.response.data.message)
          } else {
            setMessage(error.message)
          }
      }, 2000)
      return () => clearTimeout(loadingTimer)
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <a href="/">
          <img className="mx-auto h-36 w-auto" src={logo} alt="Sistema de login" />
          </a>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Faça o login da sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>

              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset pl-3 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password_hash" className="block text-sm font-medium leading-6 text-gray-900">
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password_hash"
                  name="password_hash"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset pl-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={e => setPassword_hash(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não tem uma conta?{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Clique aqui cadastrar-se
            </a>
          </p>
          {!loading ? (
            <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-4 border-t-blue-600 mx-auto mt-10" />
          ) : (
            ""
          )}
          {!startTimeout && (
            <div className="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center max-w-lg">
            <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
              <path fill="currentColor"
                  d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
              </path>
            </svg>
            <span className="text-red-800">{message}</span>
          </div>
          )}
          
        </div>
        
      </div>
    </>
  );
}

import logo from '../../assets/logo.png';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const schema = yup
  .object({
    name: yup.string().required('Este campo é obrigatório'),
    email: yup.string().email('Digite um email válido').required('Este email é obrigatório'),
    status: yup.string().required('Este campo é obrigatório'),
    role_name: yup.string().required('Este campo é obrigatório'),
    password_hash: yup.string().min(6, 'A senha deve ter pelo menos 6 digitos').required('A senha é obrigatório')
  })
  .required();

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [confirmTimeout, setConfirmTimeout] = useState(true);

  const [messageFailed, setMessageFailed] = useState("");
  const [startTimeout, setStartTimeout] = useState(true);

  const navigate = useNavigate();

  const onSubmit = async data => {
    console.log(data);

    setLoading(!loading);

    await api
      .post('/users', data)
      .then(res => {
        const loadingTimer = setTimeout(() => {
          setConfirmTimeout(false);
          setLoading(loading);
          setMessage(res.data.message);
        }, 2000);

        const reload = setTimeout(() => {
          navigate("/auth/login");
          return () => clearTimeout(reload);
        }, 4000);

        return () => clearTimeout(loadingTimer);
      })
      .catch(error => {
        console.log(error);
        const loadingTimer = setTimeout(() => {
          setStartTimeout(false);
          setLoading(loading);
          if (error.response) {
            setMessageFailed(error.response.data.message);
          } else {
            setMessageFailed("Erro: Tente novamente mais tarde!");
          }
        }, 2000);

        return () => clearTimeout(loadingTimer);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 w-auto" src={logo} alt="Sistema de login" />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Cadastre-se</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Nome Completo
              </label>

              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset pl-3 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                  {...register('name', { required: true })}
                />
                <span className="text-red-500">{errors.name?.message}</span>
              </div>
            </div>

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
                  {...register('email', { required: true })}
                />
                <span className="text-red-500">{errors.email?.message}</span>
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                Status
              </label>

              <div className="mt-2">
                <select
                  id="status"
                  name="status"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset pl-3 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                  {...register('status', { required: true })}
                >
                  <option value="active">Ativo</option>
                  <option value="inactive" disabled>
                    Inativo
                  </option>
                </select>
                <span className="text-red-500">{errors.status?.message}</span>
              </div>
            </div>

            <div>
              <label htmlFor="role_name" className="block text-sm font-medium leading-6 text-gray-900">
                Perfil de Usuário
              </label>

              <select
                id="role_name"
                name="role_name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset pl-3 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                {...register('role_name', { required: true })}
              >
                <option value="user">Usuário</option>
              </select>
              <span className="text-red-500">{errors.role_name?.message}</span>
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
                  {...register('password_hash', { required: true })}
                />
              </div>
              <span className="text-red-500">{errors.password_hash?.message}</span>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Já tem uma conta?{' '}
            <a href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Clique aqui para fazer o login
            </a>
          </p>
          {!loading ? (
            <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-4 border-t-blue-600 mx-auto mt-10" />
          ) : (
            ""
          )}

          {!confirmTimeout && (
          <div className="bg-green-200 px-6 py-4my-4 rounded-md text-lg flex items-center max-w-lg">
          <svg viewBox="0 0 24 24" className="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
              <path fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
              </path>
          </svg>
          <span className="text-green-800">{message}</span>
      </div>
        )}
        {!startTimeout && (
          <div className="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center max-w-lg">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
              <path fill="currentColor"
                  d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
              </path>
          </svg>
          <span className="text-red-800">{messageFailed}</span>
      </div>
        )}
      </div>
      </div>
    </>
  );
}

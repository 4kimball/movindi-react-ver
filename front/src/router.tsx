import React, { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import Suspense from './components/common/suspense';
import Layout from './routes/Layout';
import { ROUTES_CONFIG } from './config/routes';
const Login = React.lazy(() => import('./routes/Login'));

const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ROUTES_CONFIG.LOGIN,
        element: <Suspense lazyChildren={<Login />} />,
      },
    ],
  },
];

const Router: FC = () => {
  const routes = useRoutes(routesConfig);
  return routes;
};

export default Router;

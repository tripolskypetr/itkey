import { ISwitchItem } from 'react-declarative';

import ClientListPage from '../pages/view/ClientListPage';
import ClientOnePage from '../pages/view/ClientOnePage';

import ErrorPage from '../pages/base/ErrorPage';
import LoginPage from '../pages/base/LoginPage';

import ioc from '../lib/ioc';

interface IRouteItem extends ISwitchItem {
  sideMenu?: string;
}

const baseRoutes: IRouteItem[] = [
  {
    path: '/error_page',
    element: ErrorPage,
  },
  {
    path: '/login_page',
    element: LoginPage,
  },
];

const viewRoutes: IRouteItem[] = [
  {
    path: '/client_list',
    sideMenu: "root.client.client_list",
    element: ClientListPage,
  },
  {
    path: '/client_list/:id',
    sideMenu: "root.client.client_list",
    element: ClientOnePage,
  },
];

export const routes: IRouteItem[] = [
  {
    path: '/',
    sideMenu: "root.client.client_list",
    prefetch: async () => {
      await ioc.firebaseService.prefetch();
    },
    redirect: () => {
      if (ioc.firebaseService.isAuthorized) {
        return "/client_list";
      }
      return "/login_page";
    },
  },
  ...viewRoutes,
  ...baseRoutes,
];

export const sideMenuClickMap: Record<string, string> = {
  "root.client.client_list": "/client_list",
};

export default routes;

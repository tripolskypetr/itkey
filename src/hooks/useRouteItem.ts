import { useRouteItem as useRouteItemInternal } from "react-declarative";

import routes from "../config/routes";

import ioc from "../lib/ioc";

export const useRouteItem = () => useRouteItemInternal(routes, ioc.routerService);

export default useRouteItem;

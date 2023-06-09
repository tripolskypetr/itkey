import { IScaffold2Group } from "react-declarative";

import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import PublicIcon from "@mui/icons-material/Public";

export const sidemenu: IScaffold2Group[] = [
    {
        id: "client",
        label: "Clients",
        icon: PublicIcon,
        children: [
            {
                id: "client_list",
                label: "Client list",
                icon: PlaylistAddCheckIcon,
            },
        ],
    },
];

export default sidemenu;

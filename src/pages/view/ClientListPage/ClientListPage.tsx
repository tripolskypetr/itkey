import { 
    List,
    FieldType,
    ColumnType,
    ActionType,
    TypedField,
    IColumn,
    IListAction,
    useArrayPaginator,
    SelectionMode,
    useQueryPagination,
} from 'react-declarative';
import { observer } from 'mobx-react';

import Delete from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/Add';

import ioc from '../../../lib/ioc';
import { IClientDocument } from '../../../lib/services/db/ClientDbService';

const filters: TypedField[] = [
    {
        type: FieldType.Text,
        name: 'first_name',
        title: 'First name',
    },
    {
        type: FieldType.Text,
        name: 'last_name',
        title: 'Last name',
    },
    {
        type: FieldType.Text,
        name: 'middle_name',
        title: 'Middle name',
    },
    {
        type: FieldType.Text,
        name: 'email',
        title: 'Email',
    },
    {
        type: FieldType.Text,
        name: 'phone',
        title: 'Phone',
    },
];

const columns: IColumn<IClientDocument>[] = [
    {
        type: ColumnType.Text,
        field: 'id',
        headerName: 'ID',
        secondary: true,
        width: () => 150,
    },
    {
        type: ColumnType.Compute,
        headerName: 'Display Name',
        primary: true,
        compute: ({
            first_name,
            last_name,
            middle_name,
        }) => [
            first_name,
            last_name,
            middle_name
        ].filter((value) => value.length).join(' '),
        width: (fullWidth) => Math.max(fullWidth / 3 - 250, 200),
    },
    {
        type: ColumnType.Text,
        headerName: 'Phone',
        primary: true,
        field: 'phone',
        width: (fullWidth) => Math.max(fullWidth / 3 - 250, 200),
    },
    {
        type: ColumnType.Text,
        headerName: 'Email',
        primary: true,
        field: 'email',
        width: (fullWidth) => Math.max(fullWidth / 3 - 250, 200),
    },
    {
        type: ColumnType.Action,
        headerName: 'Actions',
        sortable: false,
        width: () => 100,
    },
];

const actions: IListAction[] = [
    {
        type: ActionType.Add,
    },
    {
        type: ActionType.Menu,
        options: [
            {
                action: 'add-action',
                label: 'Create new row',
                icon: Add,
            },
            {
                action: 'update-now',
            },
            {
                action: 'resort-action',
            },
        ],
    }
];

const rowActions = [
    {
        label: 'Remove action',
        action: 'remove-action',
        icon: Delete,
    },
];

const heightRequest = () => window.innerHeight - 75;

export const ClientListPage = observer(() => {

    const { listProps } = useQueryPagination(undefined, {
        fallback: ioc.errorService.handleGlobalError,
    });

    const handler = useArrayPaginator(async () => await ioc.clientViewService.list(), {
        onLoadStart: () => ioc.layoutService.setAppbarLoader(true),
        onLoadEnd: () => ioc.layoutService.setAppbarLoader(false),
        fallback: ioc.errorService.handleGlobalError,
    });

    const handleRowActionsClick = (action: string, row: any) => {
        alert(JSON.stringify({ row, action }, null, 2));
    };

    const handleAction = (action: string) => {
        if (action === 'add-action') {
            ioc.routerService.push(`/client_list/create`);
        }
    };

    const handleClick = (row: any) => {
        ioc.routerService.push(`/client_list/${row.id}`);
    };

    return (
        <>
            <List
                title="Client list"
                filterLabel="Filters"
                heightRequest={heightRequest}
                rowActions={rowActions}
                actions={actions}
                filters={filters}
                columns={columns}
                handler={handler}
                onRowAction={handleRowActionsClick}
                onRowClick={handleClick}
                onAction={handleAction}
                selectionMode={SelectionMode.Multiple}
                {...listProps}
            />
        </>
    );
});

export default ClientListPage;

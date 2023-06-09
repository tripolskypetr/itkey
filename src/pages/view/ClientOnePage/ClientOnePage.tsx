import { FetchView, Breadcrumbs, One, FieldType, IField, usePreventLeave, getErrorMessage } from 'react-declarative';

import ioc from '../../../lib/ioc';

interface IClientOnePageProps {
    id: string;
}

const fields: IField[] = [
    {
        type: FieldType.Line,
        title: 'Common info'
    },
    {
        type: FieldType.Text,
        name: 'first_name',
        title: 'First Name',
    },
    {
        type: FieldType.Text,
        name: 'last_name',
        title: 'Last Name',
    },
    {
        type: FieldType.Text,
        name: 'middle_name',
        title: 'Middle Name',
    },
    {
        type: FieldType.Text,
        name: 'phone',
        title: 'Phone',
    },
    {
        type: FieldType.Text,
        name: 'additional_phone',
        title: 'Additional Phone',
    },
    {
        type: FieldType.Text,
        name: 'email',
        title: 'Email',
    },
    {
        type: FieldType.Text,
        name: 'source',
        title: 'Source',
    },
    {
        type: FieldType.Text,
        name: 'looking_for',
        title: 'Looking For',
    },
    {
        type: FieldType.Text,
        name: 'series_number',
        title: 'Series Number',
    },
    {
        type: FieldType.Text,
        name: 'issued_by',
        title: 'Issued By',
    },
    {
        type: FieldType.Text,
        name: 'inn',
        title: 'INN',
    },
];

export const ClientOnePage = ({
    id,
}: IClientOnePageProps) => {

    const fetchState = async () => {
        if (id !== 'create') {
            return await ioc.clientViewService.read(id);
        }
        return null;
    };

    const Content = (props: any) => {

        const {
            data,
            oneProps,
            beginSave,
            afterSave,
        } = usePreventLeave({
            history: ioc.routerService,
            onLoadStart: () => ioc.layoutService.setAppbarLoader(true),
            onLoadEnd: () => ioc.layoutService.setAppbarLoader(false),
            onSave: async (data) => {
                let isOk = true;
                try {
                    if (id === 'create') {
                        const { id } = await ioc.clientViewService.create(data);
                        await afterSave();
                        ioc.routerService.push(`/client_list/${id}`);
                    } else {
                        await ioc.clientViewService.update(id, data);
                    }
                } catch (error) {
                    isOk = false;
                    const msg = getErrorMessage(error);
                    ioc.alertService.notify(msg);
                }
                return isOk;
            },
        });

        return (
            <>
                <Breadcrumbs
                    withSave
                    saveDisabled={!data}
                    title="Client list"
                    subtitle={id}
                    onSave={beginSave}
                    onBack={() => ioc.routerService.push('/client_list')}
                />
                <One
                    handler={() => props.todo}
                    fields={fields}
                    {...oneProps}
                />
            </>
        );
    };

    return (
        <FetchView state={fetchState}>
            {(todo) => (
                <Content todo={todo} />
            )}
        </FetchView>
    );
};

export default ClientOnePage;
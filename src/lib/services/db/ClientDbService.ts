import { makeAutoObservable } from "mobx";
import { inject } from "react-declarative";

import FirebaseService from "../base/FirebaseService";

import { CC_CLIENT_COLLECTION } from "../../../config/params";

import TYPES from "../../types";

export interface IClientDto {
    'first_name': string;
    'last_name': string;
    'middle_name': string;
    'phone': string;
    'additional_phone': string;
    'email': string;
    'source': string;
    'looking_for': string;
    'series_number': string;
    'issued_by': string;
    'inn': string;
}

export interface IClientDocument extends IClientDto {
    id: string;
}

export class ClientDbService {

    private readonly firebaseService = inject<FirebaseService>(TYPES.firebaseService);

    constructor() {
        makeAutoObservable(this);
    };

    findById = async (id: string): Promise<IClientDocument> => {
        const ref = this.firebaseService.db.collection(CC_CLIENT_COLLECTION).doc(id);
        const document = await ref.get();
        const data = await document.data();
        if (!data) {
            throw new Error('Document not found');
        }
        return { id: document.id, ...data } as IClientDocument;
    };

    findAll = async () => {
        const ref = this.firebaseService.db.collection(CC_CLIENT_COLLECTION);
        const query = await ref.get();
        const documents = await Promise.all(query.docs.map(async (document) => {
            const data = await document.data();
            return { id: document.id, ...data } as IClientDocument;
        }));
        return documents;
    };

    create = async (payload: IClientDto) => {
        const result = await this.firebaseService.db.collection(CC_CLIENT_COLLECTION).add(payload);
        const query = await result.get();
        return {
            id: result.id,
            ...query.data(),
        };
    };

    update = async (id: string, payload: Partial<IClientDto>) => {
        const ref = this.firebaseService.db.collection(CC_CLIENT_COLLECTION).doc(id);
        await ref.update(payload);
        const query = await ref.get();
        return {
            id: ref.id,
            ...query.data(),
        };
    };

    remove = async (id: string) => {
        const ref = this.firebaseService.db.collection(CC_CLIENT_COLLECTION).doc(id);
        const query = await ref.get();
        await ref.delete();
        return {
            id: ref.id,
            ...query.data(),
        };
    };

};

export default ClientDbService;

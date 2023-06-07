import { makeAutoObservable } from "mobx";
import { inject } from "react-declarative";

import FirebaseService from "../base/FirebaseService";

import { CC_TODO_COLLECTION } from "../../../config/params";

import TYPES from "../../types";

export interface ITodoDto {
    userId: string;
    title: string;
    completed: boolean;
}

export interface ITodoDocument extends ITodoDto {
    id: string;
}

export class TodoDbService {

    private readonly firebaseService = inject<FirebaseService>(TYPES.firebaseService);

    constructor() {
        makeAutoObservable(this);
    };

    findById = async (id: string): Promise<ITodoDocument> => {
        const ref = this.firebaseService.db.collection(CC_TODO_COLLECTION).doc(id);
        const document = await ref.get();
        const data = await document.data();
        if (!data) {
            throw new Error('Document not found');
        }
        return { id: document.id, ...data } as ITodoDocument;
    };

    findByUserId = async (userId: string) => {
        const ref = this.firebaseService.db.collection(CC_TODO_COLLECTION).where('userId', '==', userId);
        const query = await ref.get();
        const documents = await Promise.all(query.docs.map(async (document) => {
            const data = await document.data();
            return { id: document.id, ...data } as ITodoDocument;
        }));
        return documents;
    };

    create = async (payload: ITodoDto) => {
        return await this.firebaseService.db.collection(CC_TODO_COLLECTION).add(payload);
    };

    update = async (id: string, payload: Partial<ITodoDto>) => {
        const ref = this.firebaseService.db.collection(CC_TODO_COLLECTION).doc(id);
        await ref.update(payload);
    };

    remove = async (id: string) => {
        const ref = this.firebaseService.db.collection(CC_TODO_COLLECTION).doc(id);
        await ref.delete();
    };

};

export default TodoDbService;

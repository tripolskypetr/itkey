import { makeAutoObservable } from "mobx";
import { inject } from "react-declarative";

import TodoDbService from "../db/TodoDbService";
import FirebaseService from "../base/FirebaseService";

import TYPES from "../../types";

export class TodoViewService {

    private readonly todoDbService = inject<TodoDbService>(TYPES.todoDbService);
    private readonly firebaseService = inject<FirebaseService>(TYPES.firebaseService);

    constructor() {
        makeAutoObservable(this);
    };

    create = async (title: string) => {
        const userId = this.firebaseService.currentUser.uid;
        await this.todoDbService.create({
            userId,
            title,
            completed: false,
        });
    };

    read = async (id: string) => {
        const result = await this.todoDbService.findById(id);
        return result;
    };

    list = async () => {
        const userId = this.firebaseService.currentUser.uid;
        const documents = await this.todoDbService.findByUserId(userId);
        return documents;
    };

};

export default TodoViewService;

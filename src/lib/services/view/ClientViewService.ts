import { makeAutoObservable } from "mobx";
import { inject } from "react-declarative";

import ClientDbService, { IClientDto } from "../db/ClientDbService";

import TYPES from "../../types";

export class ClientViewService {

    private readonly clientDbService = inject<ClientDbService>(TYPES.clientDbService);

    constructor() {
        makeAutoObservable(this);
    };

    create = async (dto: IClientDto) => {
        return await this.clientDbService.create(dto);
    };

    update = async (id: string, dto: Partial<IClientDto>) => {
        return await this.clientDbService.update(id, dto);
    };

    remove = async (id: string) => {
        return await this.clientDbService.remove(id);
    };

    read = async (id: string) => {
        const result = await this.clientDbService.findById(id);
        return result;
    };

    list = async () => {
        const documents = await this.clientDbService.findAll();
        return documents;
    };

};

export default ClientViewService;

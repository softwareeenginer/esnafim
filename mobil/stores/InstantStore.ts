import { configure, makeAutoObservable } from "mobx";

configure({ enforceActions: "never" });

class InstantStoreC {
    constructor() {
        makeAutoObservable(this);
    }
}

export const InstantStore = new InstantStoreC();
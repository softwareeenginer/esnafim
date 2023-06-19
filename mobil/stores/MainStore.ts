import { configure, makeAutoObservable, observable } from "mobx";
import { create, persist } from "mobx-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

configure({ enforceActions: "never" });

class MainStoreC {
    constructor() {
        makeAutoObservable(this);
    }

    // --------- TOKEN --------- //
    @persist token = "";
    setToken(set:any) {
        this.token = set;
    }

}


const hydrate = create({ storage: AsyncStorage });

export const MainStore = new MainStoreC();


hydrate("MainStore", MainStore).then(() => {
    console.log("********** -- Store has been hydarated! -- **********");
});
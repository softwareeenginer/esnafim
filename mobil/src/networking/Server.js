import { MainStore } from "../../stores/MainStore";
import Axios from "./Axios";

let token = "";
let task;

export async function post(adres, params = null, func = () => { }, getTask = false) {


    Axios.defaults.headers.common['x-access-token'] = "Bearer " + MainStore.token;

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            task = Axios.post(adres, params);
            resolve(
                task.then(({ data }) => {
                    //IStore.setConnection(0);
                    try { data = JSON.parse(data) } catch { }
                    func()
                    return data;
                }).catch((err) => {
                    func()
                    //IStore.setConnection(1);
                    console.warn(err)
                    return { result: false, error: "No_Connect" };
                })
            )
        }, 1000);
    });



}

export function getTask() {
    return task;
}

export async function cancelPost(task) {
    task.cancel((res) => {
        console.warn("iptal")
    })
}

export function getURL() {
    return "http://192.168.43.36:3000/";
}

export function getImageURL() {
    return "http://192.168.43.36:3000/";
}
import { MainStore } from "../../stores/MainStore";
import ax from "axios"

const Axios = ax.create({
    baseURL: getURL(),
    timeout: 1000
})

let task:any;

export async function post(adres:string, params:any = null, func = () => { }) {

    Axios.defaults.headers.common['api_secret_key'] = "localhost";
    Axios.defaults.headers.common["Content-Type"]="application/json";
    Axios.defaults.headers.common['authorization'] = "Bearer " + MainStore.token; // Authu.... x-access-token

    return new Promise(function (resolve, reject) {

            task = Axios.post(adres, params);
            resolve(
                task.then(({ data }:any) => {
                    try { data = JSON.parse(data) } catch { }
                    func()
                    return data;
                }).catch((err:any) => {
                    func()
                    console.warn(err)
                    return { result: false, error: "No_Connect" };
                })
            )
    });



}

export async function cancelPost(task:any) {
    task.cancel((res:any) => {
        console.warn("iptal")
    })
}

function getURL() {
    return "http://192.168.43.36:3000/";
}
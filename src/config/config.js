import {setAxiosInter} from "./axios-intercetor";

export function initVueApp(vue) {
    setAxiosInter(() =>console.log("Unauthorized!"))

}
import axiosClient from "./axiosClient";

const todoapi={
    getall:()=>{
        const url ="todos/all";
        return axiosClient.get(url)
    }
}
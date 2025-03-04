export interface Item {
    id : number;
    name : string;
    type : string;
}

export interface User {
    id : number;
    name : string;
    username : string;
    email : string;
    password  : string;
}

export interface Auth {
    access_token : string;
    user : User;
}
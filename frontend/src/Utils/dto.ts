export interface Item {
    id : number;
    name : string;
    parent_folder_id? :  number | null;
    content? : string;
    type? : string
}

export interface Folder {
    id : number;
    name : string;
    parent_folder_id? : number | null;
    childrens? : Folder[];
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

export type Modals = Record<string, boolean>
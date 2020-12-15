import { Owner } from "./owner";

export class Repos {
    name: string;
    description:string;
    created_at:string;
    time_interval:string;
    html_url: string;
    stargazers_count:number;
    open_issues_count:number;
    owner: Owner;
    constructor(){
        this.name = "";
        this.description = "";
        this.owner = new Owner();
        this.stargazers_count = 0;
        this.open_issues_count = 0;
        this.created_at = "";
        this.time_interval = "";
        this.html_url = "";
        
    }
}

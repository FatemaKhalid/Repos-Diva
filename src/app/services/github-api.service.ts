import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GithubAPIService {
  apiReq: string = "";
  constructor(private datePipe: DatePipe, private httpclient:HttpClient) { 
  }
  getRepos(): Observable<any>{
    let mdate = new Date;
    mdate.setMonth(mdate.getMonth() - 1)
    let formatdate = 'yyyy-MM-dd';
    let latest_date =this.datePipe.transform(mdate, formatdate);
    this.apiReq = 'https://api.github.com/search/repositories?q=created:%3E'+latest_date?.toString()+'&sort=stars&order=desc&page=1'
    
    return this.httpclient.get(this.apiReq);
  }
}

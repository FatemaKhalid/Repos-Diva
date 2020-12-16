import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GithubAPIService {
  apiReq: string = "";
  // pageNum: number = 1;
  latest_date: string;

  constructor(private datePipe: DatePipe, private httpclient:HttpClient) { 
    let mdate = new Date;
    mdate.setMonth(mdate.getMonth() - 1)
    let formatdate = 'yyyy-MM-dd';
    this.latest_date = this.datePipe.transform(mdate, formatdate)|| '';
  }

  getRepos(loadingPage:number): Observable<any>{
    this.apiReq = 'https://api.github.com/search/repositories?q=created:%3E'+this.latest_date?.toString()+'&sort=stars&order=desc&page='+loadingPage.toString();
    // this.pageNum++;
    return this.httpclient.get(this.apiReq);
  }
}

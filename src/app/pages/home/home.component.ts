import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubAPIService } from "../../services/github-api.service";
import { Repos } from "../../classes/repos";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  // Repos listed per page
  lstRepos: Repos[] = [];
  // Repos received from request
  reqRepos: Repos[] = [];
  // Paginator Data
  lowValue: number = 0;
  highValue: number = 10;
  loadedPage: number = 1;

  constructor(private githubapiservice: GithubAPIService){
  }

  calculate_timeInterval_days(created_at:string):number{
      // Calculating time interval
      let Difference_In_Time = new Date().getTime() - new Date(created_at).getTime();
      let Difference_In_Days = (Difference_In_Time)/ (1000 * 3600 * 24);
      
      return Difference_In_Days;
  }

  update_repo_details(){
    
    this.reqRepos.forEach(repo => { 
      let maxlen = 190;
      repo.time_interval = Math.round(this.calculate_timeInterval_days(repo.created_at)).toString();
      // Replace description if retrieved is empty
      if (repo.description == null) {
        repo.description = "No Description Availabe";
      }
      if (repo.description.length>maxlen) {
        repo.description = repo.description.substr(0, maxlen-5)+"...";
      }
      
    });
  }


  sendRepoReq(loadingPage: number=1){
    this.githubapiservice.getRepos(loadingPage)
    .subscribe(
      data=>{
        this.reqRepos = data.items;
        this.lstRepos = this.reqRepos.slice(this.lowValue, this.highValue);
        this.update_repo_details();
        // TODO: Need to handle if No internet connection available
        
      }
    );
  }

  ngOnInit(){
    this.sendRepoReq();
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex%3 * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;

    // Sending API request when moving out of current 30 Repo
    if (this.loadedPage != Math.floor(event.pageIndex/3)+1) {
      this.reqRepos=[];
      this.loadedPage= Math.floor(event.pageIndex/3)+1;
      this.sendRepoReq(this.loadedPage);      
    }
    this.lstRepos = this.reqRepos.slice(this.lowValue, this.highValue);
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
    return event;
  }

}


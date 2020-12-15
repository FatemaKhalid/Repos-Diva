import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubAPIService } from "../../services/github-api.service";
import { Repos } from "../../classes/repos";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  lstRepos: Repos[] = [];
  reqRepos: Repos[] = [];
  // Paginator Data
  pageIndex:number;
  pageSize:number;
  length:number;
  
  constructor(private githubapiservice: GithubAPIService){
    this.pageIndex=0;
    this.pageSize=10;
    this.length=100;
  }

  calculate_timeInterval_days(created_at:string):number{
      // Calculating time interval
      let Difference_In_Time = new Date().getTime() - new Date(created_at).getTime();
      let Difference_In_Days = (Difference_In_Time)/ (1000 * 3600 * 24);
      console.log(typeof created_at);
      
      return Difference_In_Days;
  }

  update_repo_details(){
    
    this.lstRepos.forEach(repo => { 
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

  goToNext(){
    this.pageIndex++;
    this.lstRepos = []
    console.log(this.pageIndex);
    if (this.pageIndex%3==0) {
      this.githubapiservice.getRepos()
        .subscribe(
          data=>{
            this.reqRepos = data.items;
            this.lstRepos = this.reqRepos.slice(0, 10);
            this.update_repo_details();            
          }
        );
    }else{
      let idx = this.pageIndex%3;
      this.lstRepos = this.reqRepos.slice(idx*10+1, (idx+1)*10);
    }
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }

  ngOnInit(){
    this.githubapiservice.getRepos()
    .subscribe(
      data=>{
        this.reqRepos = data.items;
        this.lstRepos = this.reqRepos.slice(0, 10);
        this.update_repo_details();
        // TODO: Need to handle if reponse is empty or not correct
        console.log(this.lstRepos[0]);
        
      }
    );
  }


}


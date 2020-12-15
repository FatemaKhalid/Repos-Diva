import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubAPIService } from "../../services/github-api.service";
import { Repos } from "../../classes/repos";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  lstRepos: Repos[];
  
  constructor(private githubapiservice: GithubAPIService){
    this.lstRepos=[];
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

  ngOnInit(){
    this.githubapiservice.getRepos()
    .subscribe(
      data=>{
        this.lstRepos = data.items;
        this.update_repo_details();
        // TODO: Need to handle if reponse is empty or not correct
        console.log(this.lstRepos[0]);
        
      }
    );
  }


}


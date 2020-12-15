import { Component, OnInit, Input } from '@angular/core';
import { Repos } from "../../classes/repos";

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss']
})
export class RepoDetailsComponent implements OnInit {

  @Input() curRepo !: Repos;
  repo !: Repos;
  
  constructor() { 
  }

  ngOnInit(): void {
    this.repo = this.curRepo;
  }

}

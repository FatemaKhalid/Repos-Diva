import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { GithubAPIService } from "./services/github-api.service";
import { HomeComponent } from "./pages/home/home.component";
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RepoDetailsComponent } from './pages/repo-details/repo-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RepoDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule, 
    MatCardModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [DatePipe, GithubAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }

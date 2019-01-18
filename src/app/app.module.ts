import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './list/list.component';
import { ShowListsComponent } from './show-lists/show-lists.component';
import { TaskComponent } from './task/task.component';
import { AddNewListComponent } from './add-new-list/add-new-list.component';
import {FormsModule} from '@angular/forms';
import { ViewLoginComponent } from './view-login/view-login.component';
import { ViewRegisterComponent } from './view-register/view-register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataManagerService } from './data-manager.service';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ListComponent,
    ShowListsComponent,
    TaskComponent,
    AddNewListComponent,
    ViewLoginComponent,
    ViewRegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DataManagerService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

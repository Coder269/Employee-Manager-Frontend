import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModule } from './app.module';
import { AddComponent } from './add/add.component';
import { MainAppComponent } from './main-app/main-app.component';


	const routes: Routes = [
  	  {path: '', component: MainAppComponent }, //by default path
      { path: 'Add', component: AddComponent },
      { path: 'Main', component: MainAppComponent }
  ];



  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }

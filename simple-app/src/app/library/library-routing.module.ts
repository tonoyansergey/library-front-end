import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookComponent} from "./component/book/book.component";
import {HomeComponent} from "./component/home/home.component";
import {SignUpComponent} from "./component/sign-up/sign-up.component";
import {LoginComponent} from "./component/login/login.component";
import {ProfileComponent} from "./component/profile/profile.component";
import {LibraryComponent} from "./library.component";

const libraryRoutes: Routes = [
  { path: "", component: LibraryComponent,
        children: [
          { path: "books", component: BookComponent},
          { path: "sign-up", component: SignUpComponent},
          { path: "login", component: LoginComponent},
          { path: "profile", component: ProfileComponent},
          { path: "", component: HomeComponent}]},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(libraryRoutes)],
  exports: [RouterModule]
})

export class LibraryRoutingModule { }

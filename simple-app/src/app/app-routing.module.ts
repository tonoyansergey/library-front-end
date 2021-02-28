import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";

const routes: Routes = [
  // { path: "", redirectTo: "/library", pathMatch: "full"},
  { path: "library", loadChildren: () => import('./library/library.module').then(mod => mod.LibraryModule)},
  { path: "library-admin", loadChildren: () => import('./library-admin/library-admin.module').then(mod => mod.LibraryAdminModule)},
  { path: "**", redirectTo: "/library", pathMatch: "full"}
];

export const routing = RouterModule.forRoot(routes);
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

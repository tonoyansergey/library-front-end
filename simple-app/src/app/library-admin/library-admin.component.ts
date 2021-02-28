import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-library-admin',
  templateUrl: './library-admin.component.html',
  styleUrls: ['./library-admin.component.css']
})
export class LibraryAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}

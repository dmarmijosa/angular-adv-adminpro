import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
declare function customInitFunctions():void  ;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  

  year:number = new Date().getFullYear();

  constructor(private settingsService:SettingsService, private sidebarMenuService:SidebarService) { }

  ngOnInit(): void {
    
    customInitFunctions();
    this.sidebarMenuService.cargarMenu();

   
    
  }

}



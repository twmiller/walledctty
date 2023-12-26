import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DoorsComponent } from './doors/doors.component';
import { ConnectComponent } from './connect/connect.component';
import { MessagesComponent } from './messages/messages.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'doors', component: DoorsComponent },
  { path: 'messages/:board', component: MessagesComponent },
  //{ path: 'messages/:board/:message', component: MessagesComponent },
];
const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  scrollOffset: [0, 30],
  onSameUrlNavigation: 'reload', //Must have if you want to be able to use the anchor more than once
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}

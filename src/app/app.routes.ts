import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddComponent } from './add/add.component';
import { SearchComponent } from './search/search.component';
import {IndexComponent} from './index/index.component'
import { EditComponent } from './edit/edit.component';
import { ShareFormComponent } from './sharecomponent/share-form.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './login/auth.guard';

export const routes: Routes = [
  //path: ""：指定空路徑，即當用戶訪問根URL（http://yourdomain/）時會匹配到這個路由。
  //redirectTo: '/home'：這個屬性表示將匹配到的空路徑重定向到'/home'。即當用戶訪問根URL時，會自動重定向到http://yourdomain/home。
  //pathMatch: 'full'：這個屬性表示當整個URL路徑完全匹配空路徑時才會重定向。如果不設置pathMatch或設置為其他值，可能會出現無法正確匹配和重定向的情況。
  { path: "", redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: WelcomeComponent },
  { path: "add", component: AddComponent },
  { path: "search", component: SearchComponent },
  { path: "index", component: IndexComponent ,canActivate:[authGuard]},
  { path: "edit", component: EditComponent },
  { path: "share", component: ShareFormComponent },
  { path: "login", component: LoginComponent },

];

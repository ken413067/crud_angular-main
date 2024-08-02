import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';


import { AngularSharedModule } from '../angular-module'
import { Loginserver, datainterface } from './login.server'
import { SharedModule } from '../ng-zorro-config'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AngularSharedModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  //宣告
  loginfrom!: FormGroup
  //初始化
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginserver: Loginserver,

  ) { }
  ngOnInit(): void {
    this.loginfrom = this.fb.group({
      account: [''],
      password: ['']
    })
  }
  // 執行驗證函數
  onsubmit() {
    // console.log(this.loginfrom.value)
    const logindata: datainterface = this.loginfrom.value
    if (logindata) {
      this.loginserver.pushdata(logindata).subscribe({
        error: error => console.log(error),
        complete: () => { this.router.navigate(['index']) }
      })
    }
  }
  //刪除token函數
  onlogout(): void {
    this.loginserver.logout
    // console.log('已刪除')
  }
}

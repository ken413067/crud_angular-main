import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';//導航回上頁

import { Router, RouterModule, ActivatedRoute } from '@angular/router'; //路由器
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedModule } from '../ng-zorro-config'; //引入所有ngzorro套件
import { AngularSharedModule } from '../angular-module'; //引用常用的angular組件
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-share-form',
  standalone: true,
  imports: [SharedModule, AngularSharedModule, RouterModule, ReactiveFormsModule],
  templateUrl: './share-form.component.html',
  styleUrl: '../app.component.scss'
})

export class ShareFormComponent {
  @Input() addForm!: FormGroup
  @Input() addtext: string = '';

  // 下拉選單單位縣市、公所
  countyAndcity = ['台北', '台中', '高雄'];
  office = ['信義區公所', '中區區公所', '新興區公所'];

  constructor(
    private message: NzMessageService,
    private location: Location,
  ) { }

  // 回上頁導航
  navigateToindex() {
    this.location.back();
  }
  //提示框相關
  showModel(Message: any) {
    this.message.info(Message);
  }
}

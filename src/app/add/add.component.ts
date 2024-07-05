import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { RouterModule } from '@angular/router'; //路由器

import { DataService, DataInterface } from '../data.service'; // 引入服務
import { SharedModule } from '../ng-zorro-config'; //引入所有ngzorro套件
import { AngularSharedModule } from '../angular-module'; //引用常用的angular組件
import { ShareFormComponent } from '../sharecomponent/share-form.component';
import { SearchService } from '../search/search.service'; //搜索共用組件


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [SharedModule, AngularSharedModule, RouterModule, ShareFormComponent],
  templateUrl: './add.component.html',
  styleUrl: '../app.component.scss',
})
@Injectable({
  providedIn: 'root',
})
export class AddComponent implements OnInit {
  // 定義
  addForm!: FormGroup;
  dataList: any[] = [];
  addtext: string = '';
  isVissible = false; //定義-提示框變數

  // 依賴注入
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private shareFormComponent: ShareFormComponent,
    private searchService: SearchService,

  ) { }
  // 初始化
  ngOnInit(): void {
    this.addForm = this.fb.group({
      unitName: [''],
      office: [''],
      filingDate: [''],
      account: [''],
      name: [''],
      idNumber: [''],
      jobTitle: [''],
      phone: [''],
      email: [''],
      system: [''],
      enable: [true],
    });
    this.addtext = '新增'
  }

  //新增表單
  onSubmit(): void {
    const formData: DataInterface = this.addForm.value;
    if (this.addForm.valid) {
      this.dataService.addData(formData).subscribe((data) => {
        this.dataList.push(data);
        this.shareFormComponent.showModel('新增成功!!');
        this.searchService.changeDataList([data]);//更新訂閱者的資料
        // console.log('新增成功:', data);
      });
    }
  }
}

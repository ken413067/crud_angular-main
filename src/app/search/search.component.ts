import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; //路由器
import { Injectable } from '@angular/core';

import { DataService, DataInterface } from '../data.service'; // 引入服務及介面
import { SharedModule } from '../ng-zorro-config'; //引入所有ngzorro套件
import { AddComponent } from '../add/add.component';
import { AngularSharedModule } from '../angular-module'; //引用常用的angular組件
import { SearchService } from './search.service'; //搜索共用組件
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    AngularSharedModule, //引用常用的angular組件
    SharedModule, //ngzorro所有套件
    AddComponent,
    RouterModule, // 路由器
  ],
  templateUrl: './search.component.html',
  styleUrl: '../app.component.scss',
})
export class SearchComponent implements OnInit {
  // 定義
  searchForm!: FormGroup;
  dataList: DataInterface[] = [];
  allDataList: DataInterface[] = [];
  accountforedit: string = '';

  // 下拉選單單位縣市、公所
  countyAndcity = ['台北', '台中', '高雄'];
  office = ['信義區公所', '中區區公所', '新興區公所'];

  // 依賴注入
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private searchService: SearchService
  ) {}

  // 初始化
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      unitName: [''],
      office: [''],
      account: [''],
      name: [''],
      enable: [true],
    });
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe((data) => {
      // this.dataList = data;
      this.allDataList = data;
    });
  }

  searchSubmit(): void {
    const { unitName, office, account, name, enable } = this.searchForm.value;
    if (this.searchForm.valid) {
      this.dataList = this.allDataList.filter(
        (item) =>
          (unitName ? item.unitName === unitName : true) &&
          (office ? item.office === office : true) &&
          (account ? item.account.includes(account) : true) &&
          (name ? item.name.includes(name) : true) &&
          (enable !== null ? item.enable === enable : true)
      );
      this.searchService.changeDataList(this.dataList);
    }
  }

  onReset(): void {
    this.searchForm.reset({ enable: true });
    // this.http.get<any[]>('/api/POC_angular').subscribe(data => {
    //   this.dataList = data;
    // })
    this.loadData();
  }
}

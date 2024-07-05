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
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

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
    //初始化導航列
    this.route.queryParams.subscribe(params => {
      this.searchForm.patchValue({
        unitName: params['unitName'] || '',
        office: params['office'] || '',
        account: params['account'] || '',
        name: params['name'] || '',
        enable: params['enable'] !== undefined ? params['enable'] === 'true' : null
      });

    });
  }
  // 加載所有資料
  loadData(): void {
    this.dataService.getData().subscribe((data) => {
      this.allDataList = data;
    });
  }
  // 搜尋結果
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
      this.searchService.changeDataList(this.dataList);//推送這筆資料到各個訂閱者
      this.router.navigate([], {
        relativeTo: this.route, // 不會更新路由路徑，只會從當前路由後方更新參數
        queryParams: { unitName, office, account, name, enable },
        queryParamsHandling: 'merge' // 保留現有的查詢參數
      });
      // console.log(this.dataList)
    }
  }
  // 刪除目前輸入
  onReset(): void {
    this.searchForm.reset({ enable: true });
    // this.http.get<any[]>('/api/POC_angular').subscribe(data => {
    //   this.dataList = data;
    // })
    this.loadData();
  }
}

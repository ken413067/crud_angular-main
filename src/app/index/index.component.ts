import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; //路由器

import { DataService, DataInterface } from '../data.service'; // 引入服務及介面
import { SharedModule } from '../ng-zorro-config'; //引入所有ngzorro套件
import { AddComponent } from '../add/add.component';

import { AngularSharedModule } from '../angular-module'; //引用常用的angular組件
import { SearchComponent } from '../search/search.component';
import { SearchService } from '../search/search.service'; //搜索共用組件

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    AngularSharedModule, //引用常用的angular組件
    SharedModule, //ngzorro所有套件
    AddComponent,
    RouterModule, // 路由器
    SearchComponent, //搜索欄
  ],
  templateUrl: './index.component.html',
  styleUrl: '../app.component.scss',
})
export class IndexComponent implements OnInit {
  // 定義
  searchForm!: FormGroup;
  dataList: DataInterface[] = [];
  allDataList: DataInterface[] = [];
  accountforedit: string = '';

  // 依賴注入
  constructor(
    private dataService: DataService,
    private addComponent: AddComponent,
    private router: Router,
    private searchService: SearchService
  ) {}

  // 初始化
  ngOnInit(): void {
    this.searchService.currentDataList.subscribe((data) => {
      this.dataList = data;
      console.log(this.dataList);
    });
  }
  //刪除
  delete(item: DataInterface): void {
    this.dataService.deleteData(item.id).subscribe(() => {
      console.log('刪除成功:', item);
      this.addComponent.showModel('刪除成功');
      this.dataList = this.dataList.filter((data) => data.id !== item.id);
    });
  }

  //導航
  navigateToadd(accountforadd: string) {
    // this.router.navigate(['./add']);
    this.router.navigate(['./add'], {
      queryParams: { accountforadd: accountforadd },
    });
  }
  navigateToedit(idforedit: number) {
    this.router.navigate(['./add'], {
      queryParams: { idforedit: idforedit },
    });
  }
}

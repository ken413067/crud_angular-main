import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; //路由器

import { DataService, DataInterface } from '../data.service'; // 引入服務及介面
import { SharedModule } from '../ng-zorro-config'; //引入所有ngzorro套件
import { AddComponent } from '../add/add.component';
import { AngularSharedModule } from '../angular-module'; //引用常用的angular組件

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    AngularSharedModule, //引用常用的angular組件
    SharedModule, //ngzorro所有套件
    AddComponent,
    RouterModule, // 路由器
  ],
  templateUrl: './index.component.html',
  styleUrl: '../app.component.scss',
})
export class IndexComponent implements OnInit {
  // 定義
  searchForm!: FormGroup;
  dataList: DataInterface[] = [];
  accountforedit: string = '';

  // 下拉選單單位縣市、公所
  countyAndcity = ['台北', '台中', '高雄'];
  office = ['信義區公所', '中區區公所', '新興區公所'];

  // 依賴注入
  constructor(
    private fb: FormBuilder,
    // private http: HttpClient,
    private dataService: DataService,
    private addComponent: AddComponent,
    private router: Router
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
    // this.http.get<any[]>('/api/POC_angular').subscribe(data => {
    //   this.dataList = data;
    // })
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe((data) => {
      this.dataList = data;
      // console.log(this.dataList)
      console.log(this.accountforedit);
    });
  }

  searchSubmit(): void {
    const { unitName, office, account, name, enable } = this.searchForm.value;

    if (this.searchForm.valid) {
      this.dataList = this.dataList.filter(
        (item) =>
          (unitName ? item.unitName === unitName : true) &&
          (office ? item.office === office : true) &&
          (account ? item.account.includes(account) : true) &&
          (name ? item.name.includes(name) : true) &&
          (enable !== null ? item.enable === enable : true)
      );
    }
  }

  onReset(): void {
    this.searchForm.reset({ enable: true });
    // this.http.get<any[]>('/api/POC_angular').subscribe(data => {
    //   this.dataList = data;
    // })
    this.loadData();
  }
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

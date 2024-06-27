import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService,DataInterface } from '../data.service'; // 引入服務及介面
// import { DataInterface } from '../data-interface'; // 引入介面
import { SharedModule } from '../ng-zorro-config';//引入所有ngzorro套件

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,//ngzorro所有套件
    FormsModule,
    
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  // 定義
  searchForm!: FormGroup;
  dataList: DataInterface[] = [];

  // 下拉選單單位縣市、公所
  countyAndcity = ['台北', '台中', '高雄'];
  office = ['信義區公所', '中區區公所', '新興區公所'];


    // 依賴注入
    constructor(
      private fb: FormBuilder,
      // private http: HttpClient,
      private dataService: DataService
    ) { }

  // 初始化
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      unitName: [''],
      office: [''],
      account: [''],
      name: [''],
      enable : [true]
    });
    // this.http.get<any[]>('/api/POC_angular').subscribe(data => {
    //   this.dataList = data;
    // })
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe(data => {
      this.dataList = data;
    });
  }

  searchSubmit():void{
    if (this.searchForm.valid){
      const { unitName, office, account, name, enable } = this.searchForm.value;
      this.dataList = this.dataList.filter(item =>
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
}

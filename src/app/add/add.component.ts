import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; //路由器
import { NzMessageService } from 'ng-zorro-antd/message';

import { DataService, DataInterface } from '../data.service'; // 引入服務
import { SharedModule } from '../ng-zorro-config'; //引入所有ngzorro套件
import { AngularSharedModule } from '../angular-module'; //引用常用的angular組件

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [SharedModule, AngularSharedModule, RouterModule],
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
  addtext: string = '儲存';
  idforedit: number = 0;
  isVissible = false; //定義-提示框變數

  // 下拉選單單位縣市、公所
  countyAndcity = ['台北', '台中', '高雄'];
  office = ['信義區公所', '中區區公所', '新興區公所'];

  // 依賴注入
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {}

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

    this.route.queryParams.subscribe((params) => {
      this.idforedit = params['idforedit'];
      if (this.idforedit) {
        this.loadDataforEdit(this.idforedit);
      } else {
        this.changeAddtoEdit();
      }
    });
  }

  //新增&修改表單
  onSubmit(): void {
    const formData: DataInterface = this.addForm.value;
    if (this.addForm.valid && this.addtext === '新增') {
      this.dataService.addData(formData).subscribe((data) => {
        this.dataList.push(data);
        this.addForm.reset();
        this.showModel('新增成功!!');
        this.navigateToindex();
        console.log('新增成功:', data);
      });
    } else if (this.addForm.valid && this.addtext === '儲存') {
      console.log(this.idforedit);
      const id: number = this.idforedit;
      this.dataService.editData(id, formData).subscribe((data) => {
        // this.dataList.push(data);
        this.addForm.reset();
        this.showModel('修改成功!!');
        this.navigateToindex();
        console.log('修改成功:', data);
      });
    }
  }
  //加載已有的表單資料
  loadDataforEdit(id: number): void {
    this.dataService.getData().subscribe((data) => {
      this.dataList = data;
      const matchdata = this.dataList.find((item) => item.id === id);
      if (this.addForm.valid) {
        const filingDate = new Date(matchdata.filingDate);
        this.addForm.patchValue({
          unitName: matchdata.unitName,
          office: matchdata.office,
          filingDate: isNaN(filingDate.getTime()) ? null : filingDate, // 确保传递的是 Date 对象
          account: matchdata.account,
          name: matchdata.name,
          idNumber: matchdata.idNumber,
          jobTitle: matchdata.jobTitle,
          phone: matchdata.phone,
          email: matchdata.email,
          system: matchdata.system,
          enable: matchdata.enable,
        });
        console.log('成功拿到需要修改的資料', matchdata);
      } else {
        console.log('失敗');
      }
    });
  }
  changeAddtoEdit() {
    this.addtext = '新增';
  }
  // 導航
  navigateToindex() {
    this.router.navigate(['./index']);
  }
  //提示框相關
  showModel(Message: any) {
    this.message.info(Message);
  }

  // loadDataforEdit():void{
  //   this.dataService.getData().subscribe(data => {
  //     this.dataList = data;
  // }

  // delete(z: any) {
  //   this.http.delete('/api/POC_angular/' + z.id).subscribe();
  //   this.dataList = this.dataList.filter(data => data != z);
  // }
  // delete(item: DataInterface): void {
  //   this.dataService.deleteData(item.id).subscribe(() => {
  //     console.log('刪除成功:', item);
  //     this.dataList = this.dataList.filter(data => data.id !== item.id);
  //   });
  // }

  // onSubmit(): void {
  //   if (this.addForm.valid) {
  //     console.log(this.addForm.value);
  //     const form: any = {
  //       account: this.addForm.value.account,
  //       unitName: this.addForm.value.unitName,
  //       office: this.addForm.value.office,
  //       filingDate: this.addForm.value.filingDate,
  //       name: this.addForm.value.name,
  //       idNumber: this.addForm.value.idNumber,
  //       jobTitle: this.addForm.value.jobTitle,
  //       phone: this.addForm.value.phone,
  //       email: this.addForm.value.email,
  //       system: this.addForm.value.system,
  //       enable: this.addForm.value.enable
  //     }
  //     this.http.post('/api/POC_angular', form).subscribe(data => {
  //       this.dataList.push(data);
  //     });
  //     this.addForm.reset();
  //   }
  // }
}

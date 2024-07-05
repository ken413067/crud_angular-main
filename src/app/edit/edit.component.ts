import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; //路由器

import { ShareFormComponent } from '../sharecomponent/share-form.component';
import { AngularSharedModule } from '../angular-module'; //引用常用的angular組件
import { DataService, DataInterface } from '../data.service'; // 引入服務
import { SharedModule } from '../ng-zorro-config'; //引入所有ngzorro套件
import { SearchService } from '../search/search.service'; //搜索共用組件


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ShareFormComponent, SharedModule, AngularSharedModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: '../app.component.scss',
})
export class EditComponent implements OnInit {
  addForm!: FormGroup
  dataList: any[] = [];
  addtext: string = '';
  idforedit: string = '';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private shareFormComponent: ShareFormComponent,
    private route: ActivatedRoute,
    private searchService: SearchService,

  ) {
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
  }

  // 初始化建立新表單
  ngOnInit(): void {

    this.addtext = '修改'
    this.route.queryParams.subscribe((params) => {
      this.idforedit = params['idforedit'];
      console.log(this.idforedit)
      if (this.idforedit) {
        this.loadDataforEdit(this.idforedit)
      }
    });
  }
  //修改表單
  onSubmit(): void {
    const formData: DataInterface = this.addForm.value;
    if (this.addForm.valid) {
      const id: string = this.idforedit;
      this.dataService.editData(id, formData).subscribe((data) => {
        this.dataList.push(data);
        this.searchService.changeDataList([data]);
        // this.addForm.reset();
        this.shareFormComponent.showModel('修改成功!!');
        
      });
    }
  }
  //加載已有的表單資料
  loadDataforEdit(id: string): void {
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
        // console.log('成功拿到需要修改的資料', matchdata);
      } else {
        console.log('失敗');
      }
    });
  }
}

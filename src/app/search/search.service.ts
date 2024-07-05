//所有關於搜索欄需要共用的資料
import { Injectable } from '@angular/core';
import { DataInterface } from '../data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private dataListSource = new BehaviorSubject<DataInterface[]>([]);
  currentDataList = this.dataListSource.asObservable(); //將資料轉為觀察模式，外部組件只能查詢不能修改
  changeDataList(dataList: DataInterface[]) {
    this.dataListSource.next(dataList); //更新資料
  }
  // getData(){
  //   return this.currentDataList
  // }

}

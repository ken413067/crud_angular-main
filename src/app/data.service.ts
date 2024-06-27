import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { DataInterface } from './data-interface';
//介面規範
export interface DataInterface {
  id: number;
  unitName: string;
  office: string;
  account: string;
  name: string;
  idNumber: string;
  jobTitle: string;
  phone: string;
  email: string;
  system: string;
  enable: boolean;
}
@Injectable({
  providedIn: 'root'
})
//api串接邏輯
export class DataService {

  private apiUrl = '/api/POC_angular';

  constructor(private http: HttpClient) { }

  getData(): Observable<DataInterface[]> {
    return this.http.get<DataInterface[]>(this.apiUrl);
  }

  addData(formData: DataInterface): Observable<DataInterface> {
    return this.http.post<DataInterface>(this.apiUrl, formData);
  }

  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  //取得目前帳號的id將目前輸入資料覆蓋至匹配的id上
  editData(id:number,formData:DataInterface){
    return this.http.put<DataInterface>(`${this.apiUrl}/${id}`,formData)
  }

}

// 更新資料
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";


export interface datainterface {
    account: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})

export class Loginserver {
    // 制定登陸的連線方式(需要改網址)
    private apiUrl = '/api/POC_angular';
    private secreKey = ''

    constructor(private http: HttpClient) { }
    // 登入拿token
    pushdata(formdata: datainterface): Observable<any> {
        return this.http.post<any>(this.apiUrl, formdata)
            .pipe(
                tap((response) => {
                    if (response) {
                        localStorage.setItem('jwt_token', response)
                    }
                })
            )
    }
    // 登入
    getToken(): any {
        return localStorage.getItem('jwt_token')
    }
    // 登出
    logout():void {
        // console.log('已刪除')
        return localStorage.removeItem('jwt_token')
    }
    //驗證守衛
    isLoggedin(): boolean {
        const token = this.getToken()
        return !!token
    }
}
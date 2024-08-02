import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Loginserver } from './login.server';


export const authGuard: CanActivateFn = (route, state) => {
    //初始化
    const authServer = inject(Loginserver)
    const router = inject(Router)
    // 驗證是否有token的守門員

    if (authServer.isLoggedin()) {
        return true
        console.log('成功')

    } else {
        router.navigate(['login'])
        console.log('失敗')
        return false
    }
}
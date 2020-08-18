 
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as jwtdecode from 'jwt-decode'

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(public router: Router) { }

    getDecodedAccessToken(token: string): any {
      if(token) {
          return jwtdecode(token);
        }else return null
      }

    canActivate(): boolean {
      const tokenInfo = this.getDecodedAccessToken(localStorage.getItem('user'));
      if(tokenInfo){
        if(tokenInfo.role === 'admin') {
          this.router.navigate(['admin']);
          return false
        } else if(tokenInfo.role === 'user') {
          this.router.navigate(['dashboard']);
          return false
        }
      } else {
        return true 
      }
    }
}
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as jwtdecode from 'jwt-decode'

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(public router: Router) { }
    getDecodedAccessToken(token: string): any {
      if(token) {
          return jwtdecode(token);
        }else return null
      } 
    canActivate(): boolean {
      const token = localStorage.getItem('user');
      const tokenInfo = this.getDecodedAccessToken(token);
      if(!token) {
        this.router.navigate(['invite']);
        return false
      }
      if(tokenInfo.role === "admin") {
        return true;  
      } 
      else if(tokenInfo.role === "user") {
        this.router.navigate(['dashboard']);
        return true;
      } else {
        return false
      }
    }

}
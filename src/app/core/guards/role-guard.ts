 
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as jwtdecode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {

  getDecodedAccessToken(token: string): any {
    if(token) {
        return jwtdecode(token);
      }else return null
    } 

    constructor(public router: Router) { }

    canActivate(): boolean {
      const token = localStorage.getItem('user');
      const tokenInfo = this.getDecodedAccessToken(token);

      if(tokenInfo.role === "admin") {
        return false;
      } else if(tokenInfo.role === "user") {
        return true;
      }
    }
}
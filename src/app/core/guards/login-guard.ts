 
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(public router: Router) { }

    canActivate(): boolean {
      const token = localStorage.getItem('user')
      if(token){
        return true
      } else {
        this.router.navigate(['login'])
        return false 
      }
    }
}
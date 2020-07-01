import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  writeResultInStorage(userId, result, difference) {
    let arr = [];
    arr = JSON.parse(localStorage.getItem('resultGame')) || [];
    arr.push({userId, result, difference});
    localStorage.setItem('resultGame', JSON.stringify(arr));
  }

}
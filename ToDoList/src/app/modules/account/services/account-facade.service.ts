import { Injectable } from '@angular/core';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import { AccountCredential } from '../models/account-credential';
import { AccountApiService } from './account-api.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountFacadeService {

  constructor(private accountApi: AccountApiService, private tokenStorage: TokenStorageService) { }

  userName : string = '';

  isAuthenticated(): Boolean {
    if(this.tokenStorage.accessToken) {
      this.userName = this.tokenStorage.userName; 
      return true;
    }
    return false;
  }

  async register(credential: AccountCredential) {
    await this.accountApi.register(credential);
  }

  async login(credential: AccountCredential) {
    let response = await this.accountApi.login(credential);
    this.tokenStorage.accessToken = response[1];
    this.tokenStorage.userName = response[2];
    this.tokenStorage.userId = response[3];
  }

  logout() {
    this.tokenStorage.removeToken();
    this.tokenStorage.removeUserName();
    this.tokenStorage.removeUserId();
  }
  
}
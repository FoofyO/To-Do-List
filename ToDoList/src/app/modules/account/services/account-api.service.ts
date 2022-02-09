import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountCredential } from '../models/account-credential';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  private readonly apiUrl: string = environment.accountApiUrl;

  constructor(private httpClient: HttpClient) { }

  login(credential: AccountCredential): Promise<Array<string>> {
    let options = { responseType: 'blob' }
    credential.userName = 'default';
    return this.httpClient.post<Array<string>>(`${this.apiUrl}/login`, credential, {headers: options}).toPromise() as Promise<Array<string>>;
  }

  register(credential: AccountCredential): Promise<void> {
    let options = { responseType: 'blob' }
    return this.httpClient.post<string>(`${this.apiUrl}/register`, credential, {headers: options}).toPromise() as Promise<void>;
  }
}

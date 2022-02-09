import { HttpClient } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../../account/services/token-storage.service';
import { Folder } from '../models/folder';

@Injectable({
  providedIn: 'root'
})
export class FolderApiService {

  readonly baseUrl: string = environment.folderApiUrl;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }

  getByUserId(userId : string) {
    return this.httpClient.get<Array<Folder>>(`${this.baseUrl}?userId=${userId}`).toPromise();
  }

  getByUserIdOrdered(userId : string, param : string, sortBy : string) {
    return this.httpClient.get<Array<Folder>>(`${this.baseUrl}?userId=${userId}&param=${param}&sortBy=${sortBy}`).toPromise();
  }

  getById(id: string) {
    return this.httpClient.get<Folder>(`${this.baseUrl}/${id}`).toPromise();
  }

  Create(folder: Folder) {
    return this.httpClient.post<Folder>(this.baseUrl, folder).toPromise();
  }

  Update(id: string, folder: Folder) {
    console.log(folder);
    return this.httpClient.put<Folder>(`${this.baseUrl}/${id}`, folder).toPromise();
  }

  Delete(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`).toPromise();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../../account/services/token-storage.service';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  readonly baseUrl: string = environment.taskApiUrl;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }

  getByFolderId(folderId : string) {
    return this.httpClient.get<Array<Task>>(`${this.baseUrl}?folderId=${folderId}`).toPromise();
  }

  getById(id: string) {
    return this.httpClient.get<Task>(`${this.baseUrl}/${id}`).toPromise();
  }

  Create(task: Task) {
    return this.httpClient.post<Task>(this.baseUrl, task).toPromise();
  }

  Update(id: string, task: Task) {
    return this.httpClient.put<Task>(`${this.baseUrl}/${id}`, task).toPromise();
  }

  Delete(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`).toPromise();
  }
}

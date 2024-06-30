import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHaveId } from '../interfaces/ihaveid';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService<TModel extends IHaveId> {

  protected apiEndpoint: string;

  constructor(protected httpService: HttpClient) {
    this.apiEndpoint = `${environment.api.basePath}`;
  }

  getAll(): Observable<Array<TModel>> {
    return this.httpService.get<Array<TModel>>(this.apiEndpoint);
  }

  get(id: number | string): Observable<TModel> {
    return this.httpService.get<TModel>(
      `${this.apiEndpoint}/${id}`
    );
  }

  insert(model: TModel): Observable<TModel> {
    return this.httpService.post<TModel>(this.apiEndpoint, model);
  }

  update(model: TModel): Observable<any> {
    return this.httpService.put(`${this.apiEndpoint}/${model.Id}`, model);
  }

  insertOrUpdate(model: TModel): Observable<any> {
    if (model.Id) {
      return this.update(model);
    } else {
      return this.insert(model);
    }
  }

  delete(id: number | string): Observable<any> {
    return this.httpService.delete(`${this.apiEndpoint}/${id}`);
  }
}

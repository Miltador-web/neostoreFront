import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }
  url:string = "http://127.0.0.1:8045/fornecedores";

  getData(){
    return this.http.get<any[]>(`${this.url}`)
  }

  getDataUniqueForn(id:string){
    return this.http.get(`${this.url}/buscar/fornecedor/${id}`)
  }

  editDataForn(data:any){
    return this.http.put(`${this.url}/editar/fornecedor/${data.id}`,data)
  }

  cadastrarDataForn(data:any){
    return this.http.post(`${this.url}/inserir/fornecedor/`,data)
  }

  deleteDataUniqueForn(id:string){
    return this.http.delete(`${this.url}/delete/fornecedor/${id}`)
  }
}
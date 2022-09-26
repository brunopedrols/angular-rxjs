import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, pluck } from 'rxjs/operators'
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }

  getAcoes(valor?: string){
    const params = valor ? new HttpParams().append('valor', valor): undefined;
    return this.httpClient.
      get<AcoesAPI>('http://localhost:3000/acoes', {params})
      .pipe(
        tap((valor) => console.log(valor)),
        pluck('payload'),
        map((acoes) =>
          acoes.sort((acoaA, acoaB) => this.ordenaPorCodigo(acoaA, acoaB))
        )
      );
  }

  private ordenaPorCodigo(acoaA: Acao, acoaB: Acao){
    if(acoaA.codigo > acoaB.codigo) {
      return 1;
    }
    if(acoaA.codigo < acoaB.codigo) {
      return -1;
    }

    return 0;
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompteService {
    public host: String= 'http://localhost:8087'
    constructor(private http: HttpClient) { }

    ConsulterCompte(codeCompte: string) {
        return this.http.get(this.host + '/comptes/search/findCompteByCodeCompte?code=' + codeCompte);
    }
    Virement(codeCompte: string, codeCpte2: string, montant: string) {
        return this.http.post(this.host + '/saveoperation/virement/' + codeCompte + '/' + codeCpte2 + '/' + montant, null);
    }
    Versement(codeCompte: string, montant: string) {
        return this.http.post(this.host + '/saveoperation/versement/' + codeCompte  + '/' + montant,   null);
    }
    Retrait(codeCompte: string, montant: string) {
        return this.http.post(this.host + '/saveoperation/retrait/' + codeCompte  + '/' + montant,   null);
    }
}

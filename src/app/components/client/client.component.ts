import { Component, OnInit } from '@angular/core';
import {OperationsService} from '../../services/operations.service';
import {KeycloakService} from 'keycloak-angular';
import {CompteService} from '../../services/compte.service';
import {ModelCompte} from '../../model/model.compte';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  private username: any;
  simpleSlider = 40;
  doubleSlider = [20, 60];
  state_default: boolean = true;
  focus: any;
  private compte: any;
  codeCompte = '';
  comptee: ModelCompte = new ModelCompte();
  private compteee: ModelCompte;
  private forVirement: boolean;
  private epargne: boolean;
  private courant: boolean;
  private code: boolean;
  private account: any;
  private compteCourant: any;
  private compteEpargne: any;
  private operation: any;
  private op: any;
  private type: any;
  private operationVerser: any;
  private versement: boolean;
  private retrait: boolean;
  private operationRetrait: any;
  codeCompte2: any;
  montant = ' ';
  ope: any;
  isButtonVisible = false;
  private soldeAccount: string;
  private virbutton: any;
  isButtonVisiblesuiv = false;
  nomEnv: any;
  adresse: any;
  isButtonVisiblesuivdem = false;
    fac: any;

  constructor(protected keycloakAngular: KeycloakService, private  compteService: CompteService, private  operationsService: OperationsService) {
  }

  ngOnInit() {
   this.montant = ' '
    this.forVirement = false;
    this.code = false;
    this.courant = false;
    this.epargne = false;
    this.username = this.keycloakAngular.getUsername()
    console.log(this.keycloakAngular.getUsername())
    this.compteService.Client().subscribe(data => {
      this.compte = data
      this.account = this.compte._embedded
        this.compteCourant = this.compte._embedded.compteCourants[0].client.name
      this.compteEpargne = this.compte._embedded.compteEpargnes[0].client.name
      if (this.compteCourant || this.compteEpargne === this.username ) {
        this.soldeAccount = this.compte._embedded.compteCourants[0].solde || this.compte._embedded.compteEpargnes[0].solde
      }
        this.operationsService.getAllOperationsuser().subscribe(data => {
          this.operation = data
          console.log(this.operation)
          var keys = Object.keys(this.operation._embedded)
          console.log(keys)
            if (keys[0] === 'versements') {
              this.versement = true
              // this.retrait=false
              this.operationVerser = this.operation._embedded.versements

            }
            if (keys[1] === 'retraits') {
              // this.versement=false
              this.retrait = true
              this.operationRetrait = this.operation._embedded.retraits

            }
            if (keys[0] === 'retraits') {
              this.versement = false
              this.retrait = true
              this.operationRetrait = this.operation._embedded.retraits
            }
        })
      }, err => {
      console.log(err)
    })
  }

  logout() {
    this.keycloakAngular.logout();
  }

  consulterCompte() {
    this.code = true;
    this.compteService.Client().subscribe(data => {
      this.compte = data
      this.account = this.compte._embedded
      var keys = Object.keys(this.account)
      if (keys[0] === 'compteCourants') {
        this.compteCourant = this.compte._embedded.compteCourants[0]
        this.epargne = false
        this.courant = true
       console.log(this.compteCourant.client.name)
      } else {
        this.compteEpargne = this.compte._embedded.compteEpargnes[0]
        this.epargne = true
        this.courant = false
        console.log(this.compteEpargne.client.name)
      }
    }, err => {
      console.log(err)
    })
  }
  operations() {

    if (this.ope === 'vir') {
      this.compteService.Virement(this.codeCompte, this.codeCompte2, this.montant).subscribe(data => {
        this.compte = data
      }, err => {
        console.log(err)
      })
      this.consulterCompte()
    }
    if (this.ope  === 'ver') {
      console.log(this.virbutton.nativeElement.value )
      this.compteService.Versement(this.codeCompte, this.montant).subscribe(data => {
        this.compte = data
      }, err => {
        console.log(err)
      })
      this.consulterCompte()
    }
    if (this.ope === 'ret') {
      console.log(this.virbutton.nativeElement.value )
      this.compteService.Retrait(this.codeCompte, this.montant).subscribe(data => {
        this.compte = data
      }, err => {
        console.log(err)
      })
      this.consulterCompte()
    }

  }
  onRadioChange($event: Event) {
    this.isButtonVisible = true
  }
  onRadioChangever($event: Event) {
    this.isButtonVisible = false
  }

  suivEnvoyer($event: MouseEvent) {
    this.isButtonVisiblesuiv = true
  }
  annulerEnvoyer($event: MouseEvent) {
    this.isButtonVisiblesuiv = false
    this.isButtonVisiblesuivdem = false
  }

  toast($event: MouseEvent) {
    alert('montant envoyer avec succés')
    this.isButtonVisiblesuiv = false
    this.isButtonVisiblesuivdem = false
  }

  suivDemander($event: MouseEvent) {
    this.isButtonVisiblesuivdem = true
  }
}

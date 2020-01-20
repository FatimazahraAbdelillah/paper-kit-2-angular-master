import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CompteService} from '../../services/compte.service';
import {ModelCompte} from '../../model/model.compte';
import {$} from 'protractor';
import {OperationsService} from '../../services/operations.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('virbutton') virbutton: ElementRef;
  @ViewChild('verbutton') verbutton: ElementRef;
  simpleSlider = 40;
  doubleSlider = [20, 60];
  state_default: boolean = true;
  focus: any;
    private compte: any;
  codeCompte = '';
  comptee: ModelCompte= new ModelCompte();
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
  montant = '';
  ope: any;
  isButtonVisible = false;
  constructor(private compteService: CompteService, private  operationsService: OperationsService) { }

  ngOnInit() {
    this.forVirement = false;
    this.code = false;
    this.courant = false;
    this.epargne = false;
  }
    consulterCompte() {
      this.code = true;
      this.compteService.ConsulterCompte(this.codeCompte).subscribe(data => {
        this.compte = data
        this.account = this.compte._embedded
        var keys = Object.keys(this.account)
        if ( keys[0] === 'compteCourants') {
          this.compteCourant = this.compte._embedded.compteCourants[0]
          this.epargne = false
          this.courant = true
        }else {
          this.compteEpargne = this.compte._embedded.compteEpargnes[0]
          this.epargne = true
          this.courant = false
        }
      }, err => {
        console.log(err)
      })

      this.operationsService.getAllOperations(this.codeCompte).subscribe(data => {
        this.operation = data
        console.log(this.operation)
        var keys = Object.keys(this.operation._embedded)
        console.log(keys[0])
        if (keys[0] === 'versements')
        {
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

  onRadioChangeret($event: Event) {
    this.isButtonVisible = false
  }

  onRadioChangever($event: Event) {
    this.isButtonVisible = false
  }
}

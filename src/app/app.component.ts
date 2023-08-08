import { Component } from '@angular/core';

import { QuestionService } from './question.service';
import { QuestionBase } from './question-base';
import { map, Observable, tap } from 'rxjs';
import { DocumentProperties } from './document.properties';
import { Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  template: `
<!--    <div>-->
<!--      <h2>Job Application for Heroes</h2>-->
<!--      <app-dynamic-form [questions]="questions$ | async"></app-dynamic-form>-->
<!--    </div>-->

<!--    <h1>My Custom Form</h1>-->
<!--    <div *ngFor="let d of documentProperties$ | async">-->
<!--      <p>{{d.name}}, {{d.objectType}}, {{d.isEditable}}</p>-->
<!--    </div>-->
    
    <div>
      <h1>My Dymanic Form</h1>
      <div *ngIf="test$ | async as f">
        <app-dynamic-form [questions]="f"></app-dynamic-form>
      </div>
    </div>
  `,
  providers: [QuestionService],
})
export class AppComponent {
  questions$: Observable<QuestionBase<any>[]>;
  // documentProperties$: Observable<DocumentProperties[]>;
  test$: Observable<QuestionBase<string>[]>

  displayOrderDocumentProperties: string[] = [
    'Onderwerp',
    'Datum vastgesteld',
    'Ons kenmerk',
    'Aard document',
    'Status',
    'Laatst gewijzigd',
    'Laatst gewijzigd door',
    'Documentsoort',
    'Steller',
    'Datum document',
    'Kenmerk afzender',
    'Contactpersoon geadresseerde',
    'Geadresseerde',
    'Organisatieonderdeel',
    'Datum export',
    'Beveiligingsniveau',
    'Toegang voor',
    'Start beveiliging',
    'Beveiligd door',
    'Geplande einde beveiliging',
    'Einde beveiliging',
    'Beveiliging beëindigd door',
  ];

  d: Map<string, Validators[]> = new Map<string, Validators[]>();
  constructor(service: QuestionService) {
    this.d.set('Onderwerp', [Validators.required]);




    this.questions$ = service.getQuestions();
    // this.documentProperties$ = service.getDocumentProperties();
    this.test$ = service.getTest().pipe(
      map((a: QuestionBase<string>[]) =>
        a.sort(
          (x, y) =>
            this.displayOrderDocumentProperties.indexOf(x.label) -
            this.displayOrderDocumentProperties.indexOf(y.label)
        )
      )
    );
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

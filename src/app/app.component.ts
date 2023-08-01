import { Component } from '@angular/core';

import { QuestionService } from './question.service';
import { QuestionBase } from './question-base';
import { Observable } from 'rxjs';
import { DocumentProperties } from './document.properties';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [questions]="questions$ | async"></app-dynamic-form>
    </div>

<!--    <div *ngFor="let d of documentProperties$ | async">-->
<!--      <p>{{d.name}}, {{d.objectType}}, {{d.isEditable}}</p>-->
<!--    </div>-->

    <h1>My Custom Form</h1>
    <div>
      <app-dynamic-form [questions]="test$ | async"></app-dynamic-form>
    </div>
    
  `,
  providers: [QuestionService],
})
export class AppComponent {
  questions$: Observable<QuestionBase<any>[]>;
  // documentProperties$: Observable<DocumentProperties[]>;
  test$: Observable<QuestionBase<any>[]>

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
    // this.documentProperties$ = service.getDocumentProperties();
    this.test$ = service.getTest();
    // service.getTest().subscribe((a) => console.log(a));
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

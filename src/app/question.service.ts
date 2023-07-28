import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { Observable, map, of } from 'rxjs';
import {
  DocumentProperties,
  DocumentPropetiesAdapter,
} from './document.properties';

@Injectable()
export class QuestionService {
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

  constructor(
    private readonly http: HttpClient,
    private readonly adapter: DocumentPropetiesAdapter
  ) {}

  // TODO: get from a remote source of question metadata
  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        // order: 3,
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        // order: 1,
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        // order: 2,
      }),
    ];

    // return of(questions.sort((a, b) => a.order - b.order));
    return of(questions);
  }

  getTest(): Observable<QuestionBase<string>[]> {
    return this.getDocumentProperties().pipe(
      map((properties: DocumentProperties[]) =>
        properties.map((property: DocumentProperties) =>
          this.adapter.adapt(property)
        )
      )
    );
  }

  getDocumentProperties(): Observable<DocumentProperties[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .get<DocumentProperties[]>('./assets/document.properties.json', {
        headers,
      })
      .pipe(
        map((a: DocumentProperties[]) =>
          a.sort(
            (x, y) =>
              this.displayOrderDocumentProperties.indexOf(x.name) -
              this.displayOrderDocumentProperties.indexOf(y.name)
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

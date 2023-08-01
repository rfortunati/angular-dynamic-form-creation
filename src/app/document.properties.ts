import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { QuestionBase } from './question-base';
import { DropdownQuestion } from './question-dropdown'
import { TextboxQuestion } from './question-textbox'

export interface DocumentProperties {
  name: string;
  isEditable: boolean;
  objectType: string;
  value: string;
  options?: string[];
}


export interface Options {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class DocumentPropertiesAdapter implements Adapter<QuestionBase<string>> {
  adapt(d: DocumentProperties): QuestionBase<string> {
    let q: QuestionBase<string> = {
      value: d.value,
      key: d.name.toLowerCase().replace(/\s/g, ''),
      label: d.name,
      required: true,
      // order: 1,
      controlType: d.objectType,
      type: d.objectType,
      // for options we need to create key value pair
      // options: d.options
    };

    if (d.objectType === 'options' && !!d.options) {
      return new DropdownQuestion({
        ...q,
        options: [{key: 'a', value: 'a'}]
      })
    } else {
      return new TextboxQuestion({
        ...q
      })
    }
  }
}

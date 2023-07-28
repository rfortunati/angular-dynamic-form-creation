import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { QuestionBase } from './question-base';

export interface DocumentProperties {
  name: string;
  isEditable: boolean;
  objectType: string;
  value: string;
  options?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DocumentPropetiesAdapter implements Adapter<QuestionBase<string>> {
  adapt(d: DocumentProperties): QuestionBase<string> {
    let q: QuestionBase<string> = {
      value: d.value,
      key: d.name.toLowerCase().replace(/\s/g, ''),
      label: d.name,
      required: false,
      // order: 1,
      controlType: d.objectType,
      type: d.objectType,
      // for options we need to create key value pair
      // options: d.options
    };
    return q;
  }
}

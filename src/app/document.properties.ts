import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { QuestionBase } from './question-base';
import { DropdownQuestion } from './question-dropdown'
import { TextboxQuestion } from './question-textbox'
import { Validators } from '@angular/forms'

export interface DocumentProperties {
  name: string;
  isEditable: boolean;
  objectType: string;
  value: string;
  options?: string[];
}

export interface FormOptions {
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
      readonly: !d.isEditable,
      required: false,
      // order: 1,
      controlType: '',
      type: d.objectType,
      // for options we need to create key value pair
      // options: d.options

    };


    if (d.objectType === 'options' && !!d.options) {
      // const op: FormOptions[] = createOptions(d.options)
      return new DropdownQuestion({
        ...q,
        options: this.createOptions(d.options)
      })
    } else {
      return new TextboxQuestion({
        ...q
      })
    }

  }

  private createOptions(options: string[]): FormOptions[] {
    let formOptions: FormOptions[] = [];
    options.forEach((value: string): void => {
      let a: FormOptions = {
        key: value.toLowerCase().replace(/\s/g, ''),
        value: value
      }
      formOptions.push(a);
    })
    return formOptions;
  }
}

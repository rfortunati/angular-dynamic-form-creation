import { Validators } from '@angular/forms'

export class QuestionBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  readonly: boolean;
  required: boolean;
  // order: number;
  controlType: string;
  type: string;
  options?: { key: string; value: string }[];
  validators?: Validators[];

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      readonly?: boolean;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: { key: string; value: string }[];
      validators?: Validators[];
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.readonly = options.readonly || false;
    this.required = !!options.required;
    // this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.validators = options.validators || [];
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

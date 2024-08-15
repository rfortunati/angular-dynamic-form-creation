import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

@NgModule({ declarations: [
        AppComponent,
        DynamicFormComponent,
        DynamicFormQuestionComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule, ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

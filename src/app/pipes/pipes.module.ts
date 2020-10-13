import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatNumberPipe } from './format-number.pipe';
import { UperCaseFirstPipe } from './uper-case-first.pipe';

@NgModule({
  declarations: [
    FormatNumberPipe,
    UperCaseFirstPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatNumberPipe,
    UperCaseFirstPipe
  ]
})
export class PipesModule { }

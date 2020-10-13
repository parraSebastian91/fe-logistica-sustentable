import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRoutingModule } from './gestion-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UtilModule } from 'src/app/util/util.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { EncomiendasComponent } from './encomiendas/encomiendas.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    EncomiendasComponent
  ],
  imports: [
    PipesModule,
    UtilModule,
    GestionRoutingModule,
    MatIconModule,
    MatCardModule,
    FontAwesomeModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule
    // CommonModule,
    // MatTableModule,
    // MatCheckboxModule,
    // MatPaginatorModule,
    // MatSortModule,
    // FormsModule,
    // ReactiveFormsModule,
    // FontAwesomeModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class GestionModule { }

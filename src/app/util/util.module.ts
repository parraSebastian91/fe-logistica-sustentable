import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { FiltroComponent } from './dynamic-table/filtro/filtro.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '../pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { GestionEncomiendaComponent } from './modals/gestion-encomienda/gestion-encomienda.component';
import { BottonSheetComponent } from './botton-sheet/botton-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { ResumenEncomiendaComponent } from './modals/resumen-encomienda/resumen-encomienda.component';
import { MatIconModule } from '@angular/material/icon';
import { EstadosService } from '../services/estados.service';
import { EstadosComponent } from './dynamic-table/estados/estados.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrdenDetalleComponent } from './modals/orden-detalle/orden-detalle.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { KpiComponent } from './kpi/kpi.component';


@NgModule({
  declarations: [
    DynamicTableComponent,
    FiltroComponent,
    GestionEncomiendaComponent,
    BottonSheetComponent,
    ResumenEncomiendaComponent,
    EstadosComponent,
    OrdenDetalleComponent,
    KpiComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PipesModule,
    NgSelectModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    TooltipModule,
    MatDividerModule,
    MatCardModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  exports: [
    DynamicTableComponent,
    FiltroComponent,
    EstadosComponent,
    OrdenDetalleComponent,
    KpiComponent
  ],
  providers: [EstadosService]
})
export class UtilModule { }

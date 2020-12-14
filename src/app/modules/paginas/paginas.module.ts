import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { FormularioEncomiendaComponent } from './formulario-encomienda/formulario-encomienda.component';
import { PuntoRetiroComponent } from 'src/app/util/modals/punto-retiro/punto-retiro.component';
import { FormularioEncomiendaMasivoComponent } from './formulario-encomienda-masivo/formulario-encomienda-masivo.component';
import { UploadComponent } from 'src/app/util/upload/upload.component';
import { UperCaseFirstPipe } from 'src/app/pipes/uper-case-first.pipe';
import { FiltroComponent } from 'src/app/util/dynamic-table/filtro/filtro.component';
import { DynamicTableComponent } from 'src/app/util/dynamic-table/dynamic-table.component';
import { EditarEncomiendaComponent } from './formulario-encomienda-masivo/editar-encomienda/editar-encomienda.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';

import { LayoutComponent } from './layout/layout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SelectEnvioComponent } from './select-envio/select-envio.component';
import { GestionModule } from '../gestion/gestion.module';
import { UtilModule } from 'src/app/util/util.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { PagosComponent } from './pagos/pagos.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MoEditPagoComponent } from './pagos/mo-edit-pago/mo-edit-pago.component';

@NgModule({
  declarations: [
    FormularioEncomiendaComponent,
    PuntoRetiroComponent,
    FormularioEncomiendaMasivoComponent,
    UploadComponent,
    // UperCaseFirstPipe,
    // FormatNumberPipe,
    EditarEncomiendaComponent,
    LayoutComponent,
    SelectEnvioComponent,
    OrdenesComponent,
    PagosComponent,
    MoEditPagoComponent,
    // LoaderComponent
  ],
  imports: [
    PaginasRoutingModule,
    CommonModule,
    UtilModule,
    PipesModule,
    MatSliderModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatRippleModule,
    ScrollingModule,
    CdkStepperModule,
    CdkTableModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTabsModule,
    NgxDropzoneModule,
    NgSelectModule,
    FontAwesomeModule,
    MatMenuModule,
    MatDatepickerModule,
    HttpClientModule,
    MatSnackBarModule,
    GestionModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebaseConfig.apiKey,
      libraries: ['places']
    }),
    GooglePlaceModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class PaginasModule { }

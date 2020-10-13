import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';

import { environment } from './../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import {
  MatNativeDateModule,
  MatRippleModule
} from '@angular/material/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DocService } from './services/doc-service.service';
import { UperCaseFirstPipe } from './pipes/uper-case-first.pipe';

import { ClienteService } from './services/cliente/cliente.service';

import { UsuarioService } from './services/usuario.service';
import { CommonModule } from '@angular/common';
import { HeaderInterceptorInterceptor } from './interceptor/header-interceptor.interceptor';
import { FormatNumberPipe } from './pipes/format-number.pipe';
import { AgmCoreModule } from '@agm/core';
import { ListaUsuariosComponent } from './modules/mantenedor/lista-usuarios/lista-usuarios.component';
import { PerfilComponent } from './modules/mantenedor/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    PerfilComponent,
    // FormatNumberPipe,
    // FormularioEncomiendaComponent,
    // PuntoRetiroComponent,
    // FormularioEncomiendaMasivoComponent,
    // UploadComponent,
    // UperCaseFirstPipe,
    // FiltroComponent,
    // DynamicTableComponent,
    // EditarEncomiendaComponent,
    // LoaderComponent
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // MatSliderModule,
    // MatSidenavModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatCardModule,
    // MatButtonModule,
    // MatStepperModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatTooltipModule,
    // MatSelectModule,
    // MatListModule,
    // MatExpansionModule,
    // MatTableModule,
    // MatCheckboxModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatProgressBarModule,
    // MatNativeDateModule,
    // MatRippleModule,
    // ScrollingModule,
    // CdkStepperModule,
    // CdkTableModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatTabsModule,
    // NgxDropzoneModule,
    // NgSelectModule,
    // FontAwesomeModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebaseConfig.apiKey,
      libraries: ['places']
    })
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorInterceptor,
      multi: true
    },
    {
      provide: StorageBucket, useValue: 'gs://logistica-sustentable.appspot.com'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

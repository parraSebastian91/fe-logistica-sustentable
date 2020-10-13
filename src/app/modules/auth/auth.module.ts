import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { Routes, RouterModule } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { LoaderComponent } from 'src/app/util/loader/loader.component';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { DocService } from 'src/app/services/doc-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistroComponent,
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    HttpClientModule,
  ],
  exports: [
    LoginComponent,
    RegistroComponent,
  ],
  providers: [
    DocService,
    ClienteService,
    UsuarioService,
  ]
})
export class AuthModule { }

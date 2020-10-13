import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableComponent } from './dynamic-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { MatTableModule, MatCheckboxModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { FiltroComponent } from './filtro/filtro.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UperCaseFirstPipe } from 'src/app/pipes/uper-case-first.pipe';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent;
  let fixture: ComponentFixture<DynamicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicTableComponent,
        FiltroComponent,
        UperCaseFirstPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        FontAwesomeModule,
        // MatTableModule,
        // MatCheckboxModule,
        MatDialogModule,
        // MatPaginatorModule,
        // MatSortModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

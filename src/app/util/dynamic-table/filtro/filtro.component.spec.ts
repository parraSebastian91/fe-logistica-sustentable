import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroComponent } from './filtro.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

describe('FiltroComponent', () => {
  let component: FiltroComponent;
  let fixture: ComponentFixture<FiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        NgSelectModule
      ],
      declarations: [
        FiltroComponent,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

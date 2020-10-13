import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEncomiendaComponent } from './gestion-encomienda.component';

describe('GestionEncomiendaComponent', () => {
  let component: GestionEncomiendaComponent;
  let fixture: ComponentFixture<GestionEncomiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEncomiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

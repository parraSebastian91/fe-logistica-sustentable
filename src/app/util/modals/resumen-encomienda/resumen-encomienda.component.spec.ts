import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenEncomiendaComponent } from './resumen-encomienda.component';

describe('ResumenEncomiendaComponent', () => {
  let component: ResumenEncomiendaComponent;
  let fixture: ComponentFixture<ResumenEncomiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenEncomiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

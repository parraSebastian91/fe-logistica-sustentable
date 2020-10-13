import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEncomiendaComponent } from './editar-encomienda.component';

describe('EditarEncomiendaComponent', () => {
  let component: EditarEncomiendaComponent;
  let fixture: ComponentFixture<EditarEncomiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEncomiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

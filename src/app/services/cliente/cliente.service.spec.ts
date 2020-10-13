import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ClienteService } from './cliente.service';

describe('ClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: ClienteService = TestBed.get(ClienteService);
    expect(service).toBeTruthy();
  });
});

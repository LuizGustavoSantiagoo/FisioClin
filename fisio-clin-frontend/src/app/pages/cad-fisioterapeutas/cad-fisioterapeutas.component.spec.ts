import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadFisioterapeutasComponent } from './cad-fisioterapeutas.component';

describe('CadFisioterapeutasComponent', () => {
  let component: CadFisioterapeutasComponent;
  let fixture: ComponentFixture<CadFisioterapeutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadFisioterapeutasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadFisioterapeutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

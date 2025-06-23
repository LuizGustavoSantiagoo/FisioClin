import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoPacienteComponent } from './atendimento-paciente.component';

describe('AtendimentoPacienteComponent', () => {
  let component: AtendimentoPacienteComponent;
  let fixture: ComponentFixture<AtendimentoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendimentoPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtendimentoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

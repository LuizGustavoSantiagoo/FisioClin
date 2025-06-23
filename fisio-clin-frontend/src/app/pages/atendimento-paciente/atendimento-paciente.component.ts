import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AtendimentosService } from '../../services/atendimentos.service';
import { User } from '../../interfaces/user.interface';
import { Atendimento } from '../../interfaces/atendimento.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-atendimento-paciente',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './atendimento-paciente.component.html',
  styleUrl: './atendimento-paciente.component.css'
})
export class AtendimentoPacienteComponent implements OnInit {

  currentUser: User | null = null;
  atendimentoForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private atendimentosService: AtendimentosService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.atendimentoForm = this.fb.group({
      motivo: ['', Validators.required],
      sintomas: ['', Validators.required],
      conclusao: ['',],
      id_paciente: ['', Validators.required],
      id_fisio: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.atendimentoForm.valid) {
      const rawValues = this.atendimentoForm.value;

      const dadosAtendimento: Atendimento = {
        id: 0,
        motivo: rawValues.motivo,
        sintomas: rawValues.sintomas,
        conclusao: rawValues.conclusao,
        id_paciente: String(rawValues.id_paciente),
        id_fisio: String(rawValues.id_fisio),
      };

      this.atendimentosService.cadastrarAtendimento(dadosAtendimento).subscribe({
        next: (response) => {
          this.successMessage = response.message || 'Atendimento cadastrado com sucesso!';
          console.log('Atendimento cadastrado:', response.paciente);
          this.atendimentoForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.log(err.message);

        }
      });
    } else {
      this.errorMessage = "Preencher todos os campos corretamente";
      this.atendimentoForm.markAllAsTouched();
    }
  }
}

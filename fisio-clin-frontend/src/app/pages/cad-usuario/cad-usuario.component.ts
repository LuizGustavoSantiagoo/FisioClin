import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../interfaces/paciente.interface';

@Component({
  selector: 'app-cad-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './cad-usuario.component.html',
  styleUrl: './cad-usuario.component.css'
})
export class CadUsuarioComponent implements OnInit {

  pacienteForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pacientesService: PacientesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      data_nasc: ['', Validators.required],
      contato: ['', Validators.required],
    });
  }


  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.pacienteForm.valid) {
      const rawValues = this.pacienteForm.value;

      const dadosParaCadastro: Paciente = {
        id: rawValues.id,
        name: rawValues.name, 
        cpf: String(rawValues.cpf),
        data_nasc: rawValues.data_nasc,
        contato: String(rawValues.contato),
      };

      this.pacientesService.cadastrarPaciente(dadosParaCadastro).subscribe({
        next: (response) => {
          this.successMessage = response.message || 'Paciente cadastrado com sucesso!';
          console.log('Paciente cadastrado:', response.paciente);
          this.pacienteForm.reset(); 
        },
        error: (err) => {
          this.errorMessage = err.message || 'Erro desconhecido ao cadastrar paciente. Tente novamente.';
          console.error('Erro de cadastro:', err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios corretamente.';
      // Marca todos os controles do formulário como "touched" para exibir mensagens de erro
      this.pacienteForm.markAllAsTouched();
    }
  }
}
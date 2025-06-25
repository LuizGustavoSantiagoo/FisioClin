import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from '../../interfaces/paciente.interface';
import { PacientesService } from '../../services/pacientes.service';
import { Atendimento } from '../../interfaces/atendimento.interface';
import { AtendimentosService } from '../../services/atendimentos.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-paciente',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit {

  displayedColumns: string[] = ['fisio', 'sintomas', 'motivo', 'data_consulta', 'conclusao', 'action'];
  errorMessage: string | null = null;
  pacienteId!: string | null;
  paciente!: Paciente | undefined;
  atendimentos!: Atendimento[];
  formEdit!: FormGroup;
  delete!: boolean | null;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacientesService,
    private atendimentoService: AtendimentosService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.formEdit = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11,}$/)]],
      data_nasc: ['', Validators.required],
      contato: ['', [Validators.required, Validators.pattern(/^\d{11,}$/)]],
    });

    this.route.paramMap.subscribe(params => {
      this.pacienteId = params.get('id');

      if (this.pacienteId) {
        this.errorMessage = null;

        this.pacienteService.getPacienteById(this.pacienteId).subscribe({
          next: (pacienteData: Paciente) => {
            this.paciente = pacienteData;

            this.formEdit.patchValue({
              name: this.paciente.name || '',
              cpf: this.paciente.cpf || '',
              data_nasc: this.paciente.data_nasc || '',
              contato: this.paciente.contato || ''
            });
          },
          error: (err) => {
            this.errorMessage = err.message || 'Erro ao carregar dados do paciente.';
            console.log(this.errorMessage);
          }
        });
      } else {
        this.errorMessage = 'ID do paciente não fornecido na URL.';
      }

      if (this.pacienteId) {
        this.atendimentoService.getAtendimentosById(this.pacienteId).subscribe({
          next: (atendimentosData: Atendimento[]) => {
            this.atendimentos = atendimentosData;
          },
          error: (err) => {
            this.errorMessage = err.message;
            console.log(err);
          }
        });
      }
    });
  }

  onSubmit() {

    if (this.formEdit.valid) {

      if (this.formEdit.valid) {
        const pacientEdit = this.formEdit.value;


        if (!this.paciente || this.paciente.id === undefined || this.paciente.id === null) {
          this.errorMessage = 'Dados do paciente original (ID) não disponíveis para edição.';
          console.error(this.errorMessage);
          return;
        }

        const edit: Paciente = {
          id: Number(this.paciente.id),
          name: pacientEdit.name,
          cpf: pacientEdit.cpf,
          data_nasc: pacientEdit.data_nasc,
          contato: pacientEdit.contato,
        }

        if (this.pacienteId) {
          this.pacienteService.setPacientes(edit, this.pacienteId).subscribe({
            next: (response) => {
              this.errorMessage = null;
            },
            error: (err) => {
              this.errorMessage = err.message || 'Erro ao realizar edição.';
            }
          });
        } else {
          this.errorMessage = 'ID do paciente (da URL) não está disponível para edição.';
        }
      } else {
        this.errorMessage = 'Formulário inválido. Por favor, verifique os campos.';
        this.formEdit.markAllAsTouched();

        console.warn('Formulário inválido.');
        Object.keys(this.formEdit.controls).forEach(key => {
          const controlErrors = this.formEdit.get(key)?.errors;
          if (controlErrors != null) {
            console.log('Controle:', key, 'erros:', controlErrors);
          }
        });

        console.log('Erros do FormGroup (se houver):', this.formEdit.errors);
      }
    }
  }

  onDelete(id: string) {
    this.atendimentoService.delAtendimentos(id).subscribe({
      next: (response) => {
        this.errorMessage = null;


        this.delete = true;
        setTimeout(() => {
          this.delete = null;
        }, 8000);

      },
      error: (err) => {
        this.errorMessage = err.message || 'Erro ao apagar atendimento';

        this.delete = false;
        setTimeout(() => {
          this.delete = null;
        }, 8000);

      }
    });

  }
}

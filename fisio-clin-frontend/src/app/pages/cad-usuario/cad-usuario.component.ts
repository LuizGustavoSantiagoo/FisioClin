import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../interfaces/paciente.interface';
import { Subscription } from 'rxjs';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-cad-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatTable,
    RouterLink
  ],
  templateUrl: './cad-usuario.component.html',
  styleUrls: ['./cad-usuario.component.css']
})

export class CadUsuarioComponent implements OnInit, OnDestroy {

  pacienteForm!: FormGroup;
  pacientGet!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  private pacientesSubscription: Subscription | undefined;
  private cadastroSubscription: Subscription | undefined;

  isLoading: boolean = false;
  pacientes: Paciente[] = [];
  displayedColumns: string[] = ['name', 'cpf', 'data_nasc', 'contato', 'actions'];

  constructor(
    private fb: FormBuilder,
    private pacientesService: PacientesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pacientGet = this.fb.group({
      nameOrCpf: [''],
    });

    this.pacienteForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      data_nasc: ['', Validators.required],
      contato: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
    });

    this.loadPacientes();
  }

  ngOnDestroy(): void {
    if (this.pacientesSubscription) {
      this.pacientesSubscription.unsubscribe();
    }
    if (this.cadastroSubscription) {
      this.cadastroSubscription.unsubscribe();
    }
  }

  loadPacientes(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.pacientesSubscription) {
      this.pacientesSubscription.unsubscribe();
    }

    this.pacientesSubscription = this.pacientesService.getPacientes('', '').subscribe({
      next: (data: Paciente[]) => {
        this.pacientes = data;
        this.isLoading = false;
        console.log('Todos os pacientes carregados:', this.pacientes);
      },
      error: (err: { message: string; }) => {
        this.errorMessage = err.message || 'Erro ao carregar pacientes.';
        this.isLoading = false;
        console.error('Erro ao carregar pacientes:', err);
      }
    });
  }

  onSubmitSearch(): void {
    const searchTerm = this.pacientGet.get('nameOrCpf')?.value || '';
    this.errorMessage = null;
    this.successMessage = null;

    this.performSearch(searchTerm);
  }

  performSearch(searchTerm: string): void {
    this.isLoading = true;
    this.pacientes = [];

    if (!searchTerm) {
      this.loadPacientes();
      return;
    }

    if (this.pacientesSubscription) {
      this.pacientesSubscription.unsubscribe();
    }

      this.pacientesSubscription = this.pacientesService.getPacientes(
      /^\d+$/.test(searchTerm) ? '' : searchTerm,
      /^\d+$/.test(searchTerm) ? searchTerm : ''
    ).subscribe({
      next: (data: Paciente[]) => {
        this.pacientes = data;
        this.isLoading = false;
        if (data.length === 0) {
          this.errorMessage = 'Nenhum paciente encontrado com o termo de busca.';
        } else {
          this.errorMessage = null;
        }
        console.log('Pacientes buscados:', this.pacientes);
      },
      error: (err: { message: string; }) => {
        this.errorMessage = err.message || 'Erro ao buscar pacientes.';
        this.isLoading = false;
        console.error('Erro na busca:', err);
      }
    });
  }

  onSubmitCadastro(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.pacienteForm.valid) {
      this.isLoading = true;
      const rawValues = this.pacienteForm.value;

      const dadosParaCadastro: Paciente = {
        name: rawValues.name,
        cpf: rawValues.cpf,
        data_nasc: rawValues.data_nasc,
        contato: rawValues.contato,
        id: 0
      };

      if (this.cadastroSubscription) {
        this.cadastroSubscription.unsubscribe();
      }

      this.cadastroSubscription = this.pacientesService.cadastrarPaciente(dadosParaCadastro).subscribe({
        next: (response: { message: string; paciente: Paciente; }) => {
          this.successMessage = response.message || 'Paciente cadastrado com sucesso!';
          this.errorMessage = null;
          console.log('Paciente cadastrado:', response.paciente);
          this.pacienteForm.reset();
          this.isLoading = false;

          this.loadPacientes();
        },
        error: (err: { message: string; }) => {
          this.errorMessage = err.message || 'Erro desconhecido ao cadastrar paciente. Tente novamente.';
          this.successMessage = null;
          this.isLoading = false;
          console.error('Erro de cadastro:', err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios corretamente.';
      this.pacienteForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
}


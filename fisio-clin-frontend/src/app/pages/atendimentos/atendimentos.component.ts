import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../interfaces/paciente.interface';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-atendimentos',
  imports:
    [
      CommonModule,
      MatIconModule,
      MatTableModule,
      MatProgressSpinnerModule,
      ReactiveFormsModule],
  templateUrl: './atendimentos.component.html',
  styleUrl: './atendimentos.component.css'
})
export class AtendimentosComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private pacientesService: PacientesService,) { }

  displayedColumns: string[] = ['name', 'cpf', 'data_nasc', 'contato', 'actions'];

  pacientes: Paciente[] = [];
  isLoading: boolean = false;
  private pacientesSubscription: Subscription | undefined;

  atendimentos!: FormGroup;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.atendimentos = this.fb.group({
      nameOrCpf: ['']
    });

    this.loadPacientes();

    this.atendimentos.get('nameOrCpf')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.performSearch(value || '');
    });
  }

  ngOnDestroy() {
    if (this.pacientesSubscription) {
      this.pacientesSubscription.unsubscribe();
    }
  }

  loadPacientes(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.pacientesSubscription = this.pacientesService.getPacientes('', '').subscribe({
      next: (data: Paciente[]) => {
        this.pacientes = data;
        this.isLoading = false;
        console.log('Todos os pacientes carregados:', this.pacientes);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erro ao carregar pacientes.';
        this.isLoading = false;
        console.error('Erro ao carregar pacientes:', err);
      }
    });
  }

  onSubmit() {
    this.errorMessage = null;

    const searchTerm = this.atendimentos.get('nameOrCpf')?.value || '';

    this.performSearch(searchTerm);
  }

  performSearch(searchTerm: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.pacientes = [];

    let nameToSearch: string | undefined;
    let cpfToSearch: string | undefined;

    if (searchTerm) {
      if (/^\d+$/.test(searchTerm)) {
        cpfToSearch = searchTerm;
        nameToSearch = undefined;
      } else {
        nameToSearch = searchTerm;
        cpfToSearch = undefined;
      }
    }

    if (this.pacientesSubscription) {
      this.pacientesSubscription.unsubscribe();
    }

    this.pacientesSubscription = this.pacientesService.getPacientes(nameToSearch ?? '', cpfToSearch ?? '').subscribe({
      next: (data: Paciente[]) => {
        this.pacientes = data;
        this.isLoading = false;
        console.log('Pacientes buscados:', this.pacientes);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erro ao buscar pacientes.';
        this.isLoading = false;
        console.error('Erro na busca:', err);
      }
    });
  }

  onSearchButtonClick(): void {
    const searchTerm = this.atendimentos.get('nameOrCpf')?.value || '';
    this.performSearch(searchTerm);
  }
}

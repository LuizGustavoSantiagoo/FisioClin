import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentosService } from '../../services/atendimentos.service';
import { User } from '../../interfaces/user.interface';
import { Atendimento } from '../../interfaces/atendimento.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../interfaces/paciente.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

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
  successMessage: boolean = false;
  pacienteId: string | null = null;
  isLoading: boolean = true;
  paciente: Paciente | null = null;
  private userSubscription: Subscription | undefined;

  constructor(
    private atendimentosService: AtendimentosService,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pacienteService: PacientesService) { }

  ngOnInit(): void {

    this.atendimentoForm = this.fb.group({
      motivo: ['', Validators.required],
      sintomas: ['', Validators.required],
      conclusao: [''],
      id_paciente: [''],
      id_fisio: ['']
    });

    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;

      if (this.currentUser) {
        this.atendimentoForm.patchValue({
          id_fisio: String(this.currentUser.id)
        });
      } else {
        this.errorMessage = 'Usuário logado não encontrado.';
        console.warn('usuario nao encontrado, id_fisio');
      }
    });

    this.route.paramMap.subscribe(params => {
      this.pacienteId = params.get('id');

      if (this.pacienteId) {
        this.isLoading = true;
        this.errorMessage = null;

        this.pacienteService.getPacienteById(this.pacienteId).subscribe({
          next: (pacienteData: Paciente) => {
            this.paciente = pacienteData;
            this.isLoading = false;
            if (this.paciente) {
              this.atendimentoForm.patchValue({ id_paciente: String(this.paciente.id) });
            }
          },
          error: (err) => {
            this.errorMessage = err.message || 'Erro ao carregar dados do paciente.';
            this.isLoading = false;
            console.log(this.errorMessage);
          }
        });
      } else {
        this.errorMessage = 'ID do paciente não fornecido na URL.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = false;

    if (this.atendimentoForm.valid) {
      const dadosAtendimento = this.atendimentoForm.value;

      if (!dadosAtendimento.id_paciente || !dadosAtendimento.id_fisio) {
        this.errorMessage = "IDs de paciente ou fisioterapeuta ausentes no formulário.";
        console.error(this.errorMessage, dadosAtendimento);
        return;
      }

      const atendimentoParaSalvar: Atendimento = {
        id: dadosAtendimento.id || 0,
        motivo: dadosAtendimento.motivo,
        sintomas: dadosAtendimento.sintomas,
        conclusao: dadosAtendimento.conclusao,
        id_paciente: dadosAtendimento.id_paciente,
        id_fisio: dadosAtendimento.id_fisio,
      };

      this.atendimentosService.cadastrarAtendimento(atendimentoParaSalvar).subscribe({
        next: (response) => {
          this.atendimentoForm.reset();
          this.successMessage = true;

          setTimeout(function () {
            window.location.href = "/atendimentos";
          }, 3000)
        },
        error: (err) => {
          this.errorMessage = err.message || 'Erro ao cadastrar atendimento.';
          console.error('Erro ao cadastrar atendimento:', err);
        }
      });

    } else {
      this.errorMessage = "Preencher todos os campos corretamente";
      this.atendimentoForm.markAllAsTouched();
    }
  }
}

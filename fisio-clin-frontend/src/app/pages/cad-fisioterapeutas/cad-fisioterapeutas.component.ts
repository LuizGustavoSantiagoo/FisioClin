import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { cadastroResponseUser, Users } from '../../interfaces/users.interface';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cad-fisioterapeutas',
  imports: [ReactiveFormsModule, MatIconModule, MatTableModule, MatButtonModule],
  templateUrl: './cad-fisioterapeutas.component.html',
  styleUrl: './cad-fisioterapeutas.component.css'
})
export class CadFisioterapeutasComponent implements OnInit {
  passwordType: string = 'password';
  fisioForm!: FormGroup;
  displayedColumns: string[] = ['name', 'email', 'senha', 'actions'];
  fisio: Users | null = null;
  dataSource: Users[] = [];

  private cadastroSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService) { }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  ngOnInit() {

    this.fisioForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    });

    this.cadastroSubscription = this.userService.getUsers().subscribe(
      (response: { fisios: Users[] }) => {
        this.dataSource = response.fisios;
        this.fisio = response.fisios.length > 0 ? response.fisios[0] : null;
        console.log(response.fisios);
      },
      (error: { message: string }) => {
        console.log(error.message);
      }
    );
  }

  onSubmit() {
    if (this.fisioForm.valid) {

      const rawValues = this.fisioForm.value;

      const dadosParaCadastro: Users = {
        name: rawValues.nome,
        email: rawValues.email,
        id: 0,
        role: 'FISIOTERAPEUTA',
        password: rawValues.senha,
      }

      if (this.cadastroSubscription) {
        this.cadastroSubscription.unsubscribe();
      }

      this.cadastroSubscription = this.userService.createUser(dadosParaCadastro).subscribe(
        (response: cadastroResponseUser) => {
          console.log(response.message, response.user);
        },
        (error: { message: string }) => {
          console.log(error.message);
        }
      );
    }
  }
}

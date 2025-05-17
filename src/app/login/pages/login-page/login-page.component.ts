import {Component, EventEmitter, Output} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
import { LoginService } from '../../services/login.service';
import { Profile } from '../../../profile/model/profile.entity';
import {NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    MatButton,
    MatFormField,
    FormsModule,
    MatLabel,
    MatInput,
    NgOptimizedImage
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {
  selectedRole: string = 'Musician';
  name: string = '';
  email: string = '';
  password: string = '';

  @Output() loginSuccess = new EventEmitter<void>();

  constructor(private loginService: LoginService, private router: Router) {}

  handleRegister(): void {
    if (!this.name || !this.email || !this.password) {
      alert('Por favor, completa todos los campos antes de registrarte.');
      return;
    }

    const newProfile: Profile = {
      id: 0,
      type: this.selectedRole,
      name: this.name,
      email: this.email,
      password: this.password,
      image: '',
      occupation: '',
      biography: ''
    };

    this.loginService.register(newProfile, this.password).subscribe({
      next: () => alert('Registro exitoso'),
      error: (err) => alert(err.message)
    });
  }

  handleLogin(): void {
    this.loginService.login(this.email, this.password).subscribe({
      next: (profile) => {
        if (profile) {
          this.loginSuccess.emit();
          localStorage.setItem('loggedInUser', JSON.stringify(profile));
          this.router.navigate(['/dashboard']); // Redirige al dashboard
        } else {
          alert('Credenciales incorrectas');
        }
      },
      error: () => alert('Error al iniciar sesión')
    });
  }

  setRole(role: string): void {
    this.selectedRole = role;
  }
}

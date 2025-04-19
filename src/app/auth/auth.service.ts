import { Injectable } from '@angular/core';

export type UserType = 'adopter' | 'shelter' | '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userType: UserType = '';

  constructor() {
    const storedType = localStorage.getItem('userType');
    this._userType = (storedType === 'adopter' || storedType === 'shelter') ? storedType : '';
  }

  get userType(): UserType {
    return this._userType;
  }

  login(userType: UserType, email: string, password: string): void {
    this._userType = userType;
    localStorage.setItem('userType', userType);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }

  logout(): void {
    this._userType = '';
    localStorage.setItem('userType', '');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }
}

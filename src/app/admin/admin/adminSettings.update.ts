import { inject,Injectable, signal } from '@angular/core';
import { dummy_admin } from './dummy-admin';
import { Admin } from './admin.models';

@Injectable({
    providedIn: 'root',
  })    
  export class AdminSettingsUpdate {
      private emptyAdminObject: Admin = {
          name: '',
          email: '',
          password: ''
        };
        
    private allAdmins: Admin[] = [];
    public loggedInAdminSignal = signal<Admin>(this.emptyAdminObject);
    loggedInAdmin = this.loggedInAdminSignal.asReadonly();
    
  

    constructor() {
      const adminJson = localStorage.getItem('allAdmins');
    if (adminJson) {
      let parsed: unknown;
      try {
        parsed = JSON.parse(adminJson);
      } catch {
        parsed = null;
      }
      if (Array.isArray(parsed)) {
        this.allAdmins = parsed as Admin[];
      } else {
        console.warn('Invalid allAdmins in storage—resetting to dummy.');
        this.allAdmins = dummy_admin;
        this.updateAdminsInLocalStorage();
      }
    } else {
      this.allAdmins = dummy_admin;
      this.updateAdminsInLocalStorage();
    }
      
      const loggedInAdminJson = localStorage.getItem('loggedInAdmin');
      if (loggedInAdminJson) {
        this.loggedInAdminSignal.set(JSON.parse(loggedInAdminJson));
      } else {
        this.loggedInAdminSignal.set(this.emptyAdminObject);
      }
      
      
     
  
    }
    private _showPopup = signal(false);
    private _showPopup2 = signal(false);
    private _message = signal('');
  
    showPopup = () => this._showPopup();
    showPopup2 = () => this._showPopup2();
    message = () => this._message();
    triggerError(message: string) {
      this._message.set(message);
      this._showPopup2.set(true);
      console.log("err --->", this.message())
      console.log("err --->", this.showPopup2())
      setTimeout(() => this._showPopup2.set(false), 1000); 
    }
    trigger(message: string) {
      this._message.set(message);
      this._showPopup.set(true);
      setTimeout(() => this._showPopup.set(false), 1000); 
    }
  
    register(name: string, email: string, password: string): boolean {
      if (this.allAdmins.some(admin => admin.email === email)) {
        return false;
      }
      
      const newAdmin: Admin = {
        name,
        email,
        password
      };
      
      this.allAdmins.push(newAdmin);
      this.updateAdminsInLocalStorage();
      return true;
    }
  
    login(email: string, password: string): boolean {
      console.log('allAdmins:', this.allAdmins, 'isArray?', Array.isArray(this.allAdmins));
      const admin = this.allAdmins.find(
        (admin) => admin.email === email && admin.password === password
      );
      
      if (admin) {
        this.loggedInAdminSignal.set(admin);
        localStorage.setItem('loggedInAdmin', JSON.stringify(admin));
        return true;
      }
      
      return false;
    }
  
    logout(): void {
      this.loggedInAdminSignal.set(this.emptyAdminObject);
      localStorage.removeItem('loggedInAdmin');
    }
  
    isLoggedIn(): boolean {
      return this.loggedInAdminSignal().email !== '';
    }
  
    editProfile(editedData: Partial<{ name: string; oldPassword: string; newPassword: string; confirmNewPassword: string }>) {
      const current = this.loggedInAdminSignal();
  
      this.loggedInAdminSignal.update((admin) => ({
        ...admin,
        name: editedData.name || admin.name,
      }));
  
      if (editedData.oldPassword === current.password && editedData.newPassword) {
        this.loggedInAdminSignal.update((admin) => ({
          ...admin,
          password: editedData.newPassword!,
        }));
      }
    
      this.updateLoggedInAdmin(this.loggedInAdminSignal());
    }
    
  
    updateLoggedInAdmin(admin: Admin): void {
      this.loggedInAdminSignal.set({...admin});
      
      this.allAdmins = this.allAdmins.map(a => 
        a.email === admin.email ? admin : a
      );
      
      localStorage.setItem('loggedInAdmin', JSON.stringify(admin));
      this.updateAdminsInLocalStorage();
    }
  
    getLoggedInAdminSignal(): Admin {
      return this.loggedInAdminSignal();
    }
  
    private updateAdminsInLocalStorage(): void {
      localStorage.setItem('allAdmins', JSON.stringify(this.allAdmins));
    }
  
  }
  
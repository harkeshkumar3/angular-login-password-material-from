import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordForgetComponent } from './login/password-forget/password-forget.component';
import { PasswordResetComponent } from './login/password-reset/password-reset.component';
import { PasswordThanksComponent } from './login/password-thanks/password-thanks.component';

const routes: Routes = [

 
  { path: 'forget', component: PasswordForgetComponent },
  { path: 'changePassword', component: PasswordResetComponent },
  { path: '', component: PasswordThanksComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

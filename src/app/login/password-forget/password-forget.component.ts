import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/service/httpservice.service';
import { FormBuilder, FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-password-forget',
  templateUrl: './password-forget.component.html',
  styleUrls: ['./password-forget.component.scss']
})
export class PasswordForgetComponent implements OnInit {

  public sendEmailFrom: FormGroup;
  public progressSpinner: boolean = false;
  public applicationUrl: any;
  message: string = '"-"';
  actionButtonLabel: string = 'X';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _builder: FormBuilder, public snackBar: MatSnackBar, private _service: HttpserviceService, private _router: Router) { }

  ngOnInit() {

    this.sendEmailFrom = this._builder.group({
      userName: ['', Validators.required],
    });
    this.applicationUrl = this._service.liveApplicationUrl;

  }

  onSubmit() {

    if (this.sendEmailFrom.valid) {
      const formData = new FormData();
      formData.append('username', this.sendEmailFrom.get('userName').value);
      let username = this.sendEmailFrom.get('userName').value;
      this.progressSpinner = true;
      this._service.sendEmailLink(username)
        .subscribe(res => {
          if (res == null) {

            this.progressSpinner = false;
            this.message = 'Username does not exist please enter correct username '
            this.openSnackBar();

          }
          if (res != null && res.userid != 0) {
            this.progressSpinner = false;
            this.message = 'Password Reset link has been sent to your email address'
            this.openSnackBar();
          }

        }, error => {
          this.progressSpinner = false;
          this.message = 'Password Reset link has been sent to your email address'
          this.openSnackBar();
        })

    }

  }

  openSnackBar() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(
      this.message,
      this.action ? this.actionButtonLabel : undefined,
      config);
  }

}
 
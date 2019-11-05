import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpserviceService } from 'src/app/service/httpservice.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {


  myForm: FormGroup;

  matcher = new MyErrorStateMatcher();
  public progressSpinner: boolean = false;

  public userId: any;
  public tokenString: any;
  public validTokenlinktrue: boolean = false;
  public validTokenlinkfalse: boolean = false;
  public applicationUrl: any;
  message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'X';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';



  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private service: HttpserviceService) {

    this.route.queryParams
      .subscribe(params => {
        console.log(params); // Reading Parameters from Query
        this.userId = params.id;
        this.tokenString = params.token;
        this.progressSpinner = true;
        this.service.validateTokenString(this.userId, this.tokenString)
          .subscribe(res => {
            this.progressSpinner = false;
            if (res) {
              console.log(res);

              this.validTokenlinktrue = true;

            } else {
              this.validTokenlinkfalse = true;
            }
          }, error => {
            this.progressSpinner = false;
            this.validTokenlinkfalse = true;
          })

      });


  }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
    this.applicationUrl = this.service.liveApplicationUrl;
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }


  onSubmit() {
    console.log(this.myForm.valid);

    if (this.myForm.valid) {


      this.progressSpinner = true;
      let userObj: any = {};

      userObj.userId = this.userId;
      userObj.token = this.tokenString;
      userObj.newPassword = this.myForm.get('password').value;
      userObj.confirmPassword = this.myForm.get('confirmPassword').value;

      // console.log(userObj);

      const formData = new FormData();
      formData.append('userId', this.userId);
      formData.append('token', this.tokenString);
      formData.append('newPassword',this.myForm.get('password').value );
      formData.append('confirmPassword',this.myForm.get('confirmPassword').value );


      this.service.resetPassword(userObj.userId, userObj.token,userObj.newPassword,userObj.confirmPassword)
        .subscribe(res => {
          this.progressSpinner = false;
          this.message = 'Success!! Your Password has been changed! '
          this.openSnackBar();
        }, error => {
          console.log(error);
          
          this.progressSpinner = false;
          this.message = 'We are facing some issue please try after sometime'
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
import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/service/httpservice.service';

@Component({
  selector: 'app-password-thanks',
  templateUrl: './password-thanks.component.html',
  styleUrls: ['./password-thanks.component.scss']
})
export class PasswordThanksComponent implements OnInit {

  constructor(private shareService: HttpserviceService) { }

  ngOnInit() {
    window.location.href = this.shareService.liveApplicationUrl;
  }

}

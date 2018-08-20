import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'anms-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {
  public email: string;
  public password: string;
  public supportedEmails: string[];
  public defaultPassword: string;
  constructor() {
    this.supportedEmails = ['amunoz@deftconsultinginc.com', 'mmachicado@deftconsultinginc.com', 'sfrantz@deftconsultinginc.com'];
    this.defaultPassword = 'finalversion';
  }

  ngOnInit() {}

  onSubmitLogin() {
    const emailEntered = this.supportedEmails.find((email) => email === this.email);
    if (emailEntered && this.password === this.defaultPassword) {
      return true;
    } else { return false; }
  }
}

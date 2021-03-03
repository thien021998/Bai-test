import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Services/user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name: string | undefined;
  pass: string | undefined;
  private returnUrl: string | undefined;
  public form = new FormGroup ({
    username : new FormControl(''),
    password : new FormControl('')
  })
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private User:UserService) { }

  async ngOnInit(): Promise<void> {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
    this.name = this.User.name;
    this.pass = this.User.pass;


    if (this.name || this.pass) {
      await this.router.navigate([this.returnUrl]);
    }

  }
  async onSubmit(){
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    if (this.form.valid) {

        this.User.name = this.form.value.username;
        this.User.pass = this.form.value.password;
        console.log("Username: "+this.form.value.username)
        console.log("Password: " +this.form.value.password)
        await this.router.navigate([this.returnUrl]);
  }
}
}

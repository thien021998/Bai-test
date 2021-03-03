import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServerHttpService } from '../Services/server-http.service';
import { UserService } from '../Services/user.service';
import { User } from '../User/User';
// export interface User {
//   id : number
//   email: string;
//   first_name: number;
//   avatar: number;
//   last_name: string;
// }

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public id = 0;
  public studentForm = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    avatar: new FormControl(''),
  });
  newStudent: any;
  constructor(private serverHttp: ServerHttpService,
              private userservices : UserService,
              public dialogRef: MatDialogRef<FormComponent>
    ) { }

  ngOnInit(): void {
    this.id = this.userservices.id
    console.log(this.id)
    this.loadData(this.id);
  }
  private loadData(id :number) {
    console.log("id:"+id)
    this.serverHttp.getUser(id).subscribe((data) => {
      console.log('getStudent', data);
      for (const controlName in this.studentForm.controls) {
        if (controlName) {
          this.studentForm.controls[controlName].setValue(data.data[controlName]);
        }
      }
    });
  }
  private createNewData() {
    const newStudent = '';
    for (const controlName in this.studentForm.controls) {
      if (controlName) {
        this.newStudent[controlName] = this.studentForm.controls[controlName].value;
      }
    }
    return newStudent as unknown as User;
  }
  public save() {
    if (this.id > 0) {
      this.serverHttp
        .UpdateUser(this.id, this.createNewData())
        .subscribe((data) => {
          //
        });
    } else {
      this.serverHttp.PostUser(this.createNewData()).subscribe((data) => {
        this.userservices.increamentStudent();
        this.studentForm.reset();
      });
    }
  }
  onClose(){

    // this.serverHttp
    // .UpdateUser(this.id, this.createNewData()).subscribe((data) => {
    //   //
    // });

    this.dialogRef.close();
  }
}

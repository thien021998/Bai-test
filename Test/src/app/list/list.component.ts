import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import {Sort} from '@angular/material/sort';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormComponent } from '../form/form.component';
import { ServerHttpService } from '../Services/server-http.service';
import { UserService } from '../Services/user.service';

export interface User {
  id : number
  email: string;
  first_name: number;
  avatar: number;
  last_name: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first_name','last_name' ,'email', 'avatar', 'actions'];
  // dataSource = new MatTableDataSource(this.users);
  // dataSource = new MatTableDataSource(this.users);
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  public users : User [] = [];
  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(private serverHttp  : ServerHttpService,
              private userservices : UserService,
              private dialog: MatDialog,
    ) {
   }

  ngOnInit(): void {
    this.loadData();
  }
  private loadData() {
    this.serverHttp.getAllUser().subscribe((data) => {
      console.log('getStudents', data);
      this.users = data.data
      console.log('getStudents1', this.users);
      this.userservices.setTotalStudents(data.data.length);
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
    });
  }
  public onDelete(id : number){
    console.log(id)
    for(var i = 0; i < this.users.length; i++) {
      if(this.users[i].id == id) {
          this.users.splice(i, 1);
          break;
      }
  }
  this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
  }
  onEdit(id :number) {
    this.userservices.id = id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(FormComponent,dialogConfig);
  }
}




import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    DialogComponent,
    FormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

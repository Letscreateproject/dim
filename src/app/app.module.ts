import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { DownloadComponent } from './components/download/download.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { UserformComponent } from './components/userform/userform.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProgressComponent } from './components/progress/progress.component';
import { DndDirective } from './components/dnd/dnd.directive';
import { AuditComponent } from './components/audit/audit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppinglistComponent } from './components/shoppinglist/shoppinglist.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { NgChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from './components/shared-component/shared-component.module';
import { MatIcon, MatIconModule } from '@angular/material/icon';
// import { TableListComponent } from './components/shared-component/table-list/table-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UploadComponent,
    DownloadComponent,
    UserlistComponent,
    UserformComponent,
    MenuComponent,
    HeaderComponent,
    ProgressComponent,
    DndDirective,
    AuditComponent,
    ShoppinglistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedComponentModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

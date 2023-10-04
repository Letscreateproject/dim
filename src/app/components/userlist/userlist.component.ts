import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/_services/common/common.service';
import { UserformComponent } from '../userform/userform.component';
export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  action: string;
}

/** Constants used to fill up our data base. */

const NAMES: string[] = [
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
  'User',
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent  {

  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private commonsvc: CommonService) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource();
  }
 ngOnInit() {
  this.getUserList();
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UserformComponent, {
    
    
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });
  }
  getUserList() {
    this.commonsvc.getList().subscribe((result: any) => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result.data);
    });
}
}
/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + id;

  return {
    id: id.toString(),
    name: name,
    username: name,
    email:name + '@gmail.com',
    action:''
  };


  }
  


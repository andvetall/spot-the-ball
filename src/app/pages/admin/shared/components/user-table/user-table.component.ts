import { ToastrService } from 'ngx-toastr';
import { OnInit, Component, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '../new-user/new-user.component';
import { UserDataDialogComponent } from '../user-data/user-data.dialog.component';

@Component({
  selector: "user-table",
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.scss"],
  encapsulation: ViewEncapsulation.None 
})
export class UserTableComponent implements OnInit {
  public displayedColumns: string[] = [];
  public dataSource = new MatTableDataSource();
  public data: any;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllUsers();    
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
      if(res.length !== 0) {
        const tableItems = res.filter(value => {
          return value.role !== 'admin' && value.gameType !== undefined;
        })
  
        this.displayedColumns = Object.keys(tableItems[0]).filter(
          (key) => key !== "_id" && key !== "__v" && key !== 'password'
        );
        this.displayedColumns.push("actions");
        this.dataSource = new MatTableDataSource(tableItems);
        this.dataSource = tableItems;
        this.data = tableItems;
      }
    }, err => err)
  }

  openModal(type, element?) {
    if (type === "update") {
      const data: any = {
        type: type,
        _id: element._id,
        email: element.email,
        firstName: element.firstName,
        lastName: element.lastName,
        gameType: element.gameType,
        password: element.password,
        role: element.role,
      };
      const dialogRef = this.dialog.open(NewUserComponent, {
        width: "700px",
        data: data,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.getAllUsers();
      });
    } else if (type === "add") {
      const data: any = {
        type: type,
      };
      const dialogRef = this.dialog.open(NewUserComponent, {
        width: "700px",
        data: data,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.getAllUsers();
      });
    }
  }

  showUserData(element) {
    const data: any = {
      _id: element._id,
      email: element.email,
      firstName: element.firstName,
      lastName: element.lastName,
      gameType: element.gameType,
      role: element.role,
    };
    const dialogRef = this.dialog.open(UserDataDialogComponent, {
      width: "700px",
      data: data, 
    });
  }

  deleteUser(user) {
    if(user) {
      this.userService.deleteUser(user).subscribe(res => {
        this.toastr.success('User deleted');
        this.getAllUsers();
      }, err => {
        this.toastr.error(err);
      })
    }
  }
}
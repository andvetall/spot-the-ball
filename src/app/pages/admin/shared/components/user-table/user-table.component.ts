import { ToastrService } from 'ngx-toastr';
import { OnInit, Component, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '../new-user/new-user.component';
import { UserDataDialogComponent } from '../user-data/user-data.dialog.component';
import { environment } from "src/environments/environment";

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
  public result: any;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {
    this.userService.allUsers.subscribe(res => {
      if(res && res.length > 1) {
        this.result = res;
        if(this.result) {
          const tableItems = this.result.filter(value => {
            return value.role !== 'admin' && value.gameType !== undefined;
          })
          tableItems.sort(function (a, b) {
            return ('' + a.gameType).localeCompare(b.gameType);
          })
          
          this.displayedColumns = Object.keys(tableItems[0]).filter(
            (key) => key !== "_id" && key !== "__v" && key !== 'password'
          );
          this.displayedColumns.push("actions");
          this.dataSource = new MatTableDataSource(tableItems);
          this.dataSource = tableItems;
          this.data = tableItems;
        }
      }
    }, err => err)
  }

  ngOnInit() {
    this.getAllUsers();    
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
      if(res.length !== 0) {
        this.userService.setAllUsers(res);
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
        favoriteTeam: element.favoriteTeam,
        gameType: element.gameType,
        password: element.password,
        role: element.role,
        referredBy: element.referredBy,
        rate: element.rate
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
        setTimeout(() => {
          this.getAllUsers();
        }, 2000)
      });
    }
  }

  createCSVUsers() {
    this.userService.createUsersCsv().subscribe(
      res => {
        setTimeout(() => {
          window.open(`${environment.apiUrl}/usersCsv`);
        }, 3000);
      },
      err => err);
  }

  showUserData(element) {
    const data: any = {
      _id: element._id,
      email: element.email,
      firstName: element.firstName,
      lastName: element.lastName,
      favoriteTeam: element.favoriteTeam,
      gameType: element.gameType,
      role: element.role,
    };
    const dialogRef = this.dialog.open(UserDataDialogComponent, {
      width: "700px",
      data: data, 
    });
  }

  deleteUser(user) {
    if (user) {
      this.userService.deleteUser(user).subscribe(res => {
        this.data.forEach((item, index) => {
          if(item._id === user._id) {
            this.data.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.data);
          }
        })
        this.toastr.success('User deleted');
        this.getAllUsers();
      }, err => err);
    }
  }
}
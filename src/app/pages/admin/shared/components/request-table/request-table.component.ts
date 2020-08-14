import { ToastrService } from 'ngx-toastr';
import { OnInit, Component, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '../new-user/new-user.component';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss']
})
export class RequestTableComponent implements OnInit {
  public displayedColumns: string[] = [];
  public dataSource = new MatTableDataSource();
  public data: any;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getData();    
  }

  getData() {
    this.userService.getAllRequests().subscribe(res => {
      if(res.length !== 0) {
        this.userService.setRequestAmoun(res.length)
        const tableItems = res
        this.displayedColumns = Object.keys(tableItems[0]).filter(
          (key) => key !== "_id" && key !== "__v" && key !== 'password' && key !== 'opened'
        );
        this.displayedColumns.push("actions");
        this.dataSource = new MatTableDataSource(tableItems);
        this.dataSource = tableItems;
        this.data = tableItems;
      } else {
        this.data = null
        this.userService.setRequestAmoun(res.length)
      }
    }, err => err)
  }

  openModal(type, element?) {
      const data: any = {
        type: type,
        _id: null,
        email: element.email,
        firstName: element.firstName,
        lastName: element.lastName,
        favoriteTeam: element.favoriteTeam,
        gameType: null,
        password: null,
        role: null,
        referredBy: element.referredBy
        ,
      };
      const dialogRef = this.dialog.open(NewUserComponent, {
        width: "700px",
        data: data,
      });

      dialogRef.afterClosed().subscribe((result) => {
        setTimeout(() => {
          this.getData();
          this.userService.getAllUsers().subscribe(res => {
            this.userService.setAllUsers(res)
          }, err => err)
        }, 2000)
      });
  }

  deleteRequest(request) {
    this.userService.deleteRequest(request.email).subscribe(res => {
      this.getData();
      this.toastr.success('Request is removed');
    }, err => err)
  }
}

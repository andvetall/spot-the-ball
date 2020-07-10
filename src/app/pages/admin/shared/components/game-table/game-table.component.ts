import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { GamesService } from "src/app/services/games.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { GameForm } from "../game-form/game-form.component";
import { ResultService } from "src/app/services/result.service";
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "game-table",
  templateUrl: "./game-table.component.html",
  styleUrls: ["./game-table.component.scss"],
})
export class GameTable implements OnInit {
  public data: any;
  public displayedColumns: string[] = [];
  public dataSource = new MatTableDataSource();
  @Output() gameUpdated = new EventEmitter();

  constructor(
    private gamesService: GamesService,
    private dialog: MatDialog,
    private resultService: ResultService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllImages();
  }

  getAllImages() {
    return this.gamesService.getAllImages().subscribe(res => {
      if(res.length !== 0) {
        this.displayedColumns = Object.keys(res[0]).filter(
          (key) => key !== "_id" && key !== "__v"
        );
        this.displayedColumns.push("actions");
        this.dataSource = new MatTableDataSource(res);
        this.dataSource = res;  
        this.data = res; 
      }     
    }, err => err);
  }

  actionModal(type, element?) {
    if (type === "update") {
      const data: any = {
        type: type,
        _id: element._id,
        title: element.title,
        image: element.image,
        imageOriginal: element.imageOriginal,
        gameType: element.gameType,
        dateFrom: element.dateFrom,
        dateTo: element.dateTo,
        positionX: element.positionX,
        positionY: element.positionY,
      };
      const dialogRef = this.dialog.open(GameForm, {
        width: "700px",
        data: data,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.getAllImages();
      });
    } else if (type === "add") {
      const data: any = {
        type: type,
      };
      const dialogRef = this.dialog.open(GameForm, {
        width: "700px",
        data: data,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.getAllImages();
      });
    }
  }

  delete(id) {
    if (id) {
      this.gamesService.deleteGame(id).subscribe(res => {
        this.data.forEach((item, index) => {
          if(item._id === id._id) {
            this.data.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.data);
          }
        })
        this.toastr.success('Game deleted');
        this.getAllImages();
      }, err => err);
    }
  }

  createCsv(id) {
    this.resultService.createCsv(id._id).subscribe(
      res => {
        setTimeout(() => {
          window.open(`${environment.apiUrl}/download`);
        }, 3000);
      },
      err => err);
  }
}

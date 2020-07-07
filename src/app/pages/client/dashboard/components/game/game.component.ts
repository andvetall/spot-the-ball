import { Component, ViewChild, ElementRef, OnInit, HostListener } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { GamesService } from "src/app/services/games.service";
import * as jwtdecode from "jwt-decode";
import { StorageService } from "../../../shared/services/storage.service";
import { ResultDialogComponent } from "../../../shared/components/result-dialog/result-dialog.component";
import { ResultService } from "src/app/services/result.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserModel } from "src/app/shared/interfaces";
import { ResultXY } from "src/app/shared/interfaces/result.model";
import * as moment from 'moment';

@Component({
  selector: "game-component",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  @ViewChild("gameBox", null) gameBox: ElementRef;
  @ViewChild("successImage", null) successImage: ElementRef;
  public x: number = 0;
  public y: number = 0;
  public result: ResultXY;
  public differencePosition: number;
  public width: number;
  public height: number;
  public localStorageUser: string = localStorage.getItem("user");
  public resultsData;
  public gameData: any;
  public currentDate = Date.now();
  public currDateConv = moment(this.currentDate).format('MM-DD-YYYY');
  
  constructor(
    private dialog: MatDialog,
    private gamesService: GamesService,
    private storageService: StorageService,
    private resultService: ResultService,
    private router: Router,
    private rote: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.rote.queryParams.subscribe((params) => {
      this.resultService.getOneById(params.gameId).subscribe((res) => {
        if (res.length === 0) {
          this.gamesService.findOneById(params.gameId).subscribe((res) => {
            this.gameData = res;
            this.gameData.dateTo = moment(res.dateTo).format('MM-DD-YYYY');
          });
        } else if (res.length >= 1) {
          res.forEach((result) => {
            if (result.user === params.userId) {
              let arr = JSON.parse(localStorage.getItem('temporary-result')) || [];
              arr.push({result: result.position, differencePosition: result.difference, game: result.game});
              localStorage.setItem("temporary-result", JSON.stringify(arr));
              this.router.navigate(["/result"]);
              return;
            } else if (result.user !== params.userId) {
              this.gamesService.findOneById(params.gameId).subscribe((res) => {
                this.gameData = res;
                this.gameData.dateTo = moment(res.dateTo).format('MM-DD-YYYY');
              });
            }
          });
        }
      });
    });
  }

  @HostListener("mousemove", ["$event.target"])
  onMousemove(event) {    
    if (event.offsetX || event.offsetY) {
      this.x = event.offsetX;
      this.y = event.offsetY;
    }
  }

  mouseClickListener(event) {
    this.x = event.offsetX;
    this.y = event.offsetY;
    this.result = {
      x: event.offsetX,
      y: event.offsetY,
    };

    this.differencePosition = this.ballPositionDiffFromReal(
      this.result.x,
      this.result.y
    );
    this.successImage.nativeElement.style = `
      width: 40px;  
      position: absolute;
      top: ${this.y - 9}px;
      left: ${this.x - 18}px;
      display: block;
    `;

    const user: UserModel = this.getDecodedUser(this.localStorageUser);
    this.storageService.writeResultInStorage(
      user.id,
      this.result,
      this.differencePosition
    );
    this.openDialog(event.offsetX, event.offsetY, this.differencePosition);

    let arr = JSON.parse(localStorage.getItem('temporary-result')) || [];
    arr.push({result: this.result, differencePosition: this.differencePosition, game: this.gameData._id});
    localStorage.setItem("temporary-result", JSON.stringify(arr));
  }

  ballPositionDiffFromReal(resultX, resultY, realPositionX?, realPositionY?) {
    const img: HTMLImageElement = this.gameBox.nativeElement;

    this.width = img.naturalWidth;
    this.height = img.naturalHeight;

    realPositionX = this.gameData.positionX;
    realPositionY = this.gameData.positionY;

    let realPosX = ((this.width / 100) * realPositionX) / 100;
    let realPosY = ((this.height / 100) * realPositionY) / 100;
    let resX = ((this.width / 100) * resultX) / 100;
    let resY = ((this.height / 100) * resultY) / 100;

    const res = Math.sqrt((realPosX - resX) ** 2 + (realPosY - resY) ** 2);
    const finalRes = 100 - +res;

    return +finalRes.toFixed(2);
  }

    openDialog(x, y, difference) {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      width: "400px",
      height: "350px",
      data: {
        positionX: x,
        positionY: y,
        difference: difference,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getDataFromLS();
      this.router.navigate(["result"]);
    });
  }

  getDecodedUser(user: string): any {
    if (user) {
      return jwtdecode(user);
    } else return null;
  }

  getDataFromLS() {
    this.resultsData = JSON.parse(localStorage.getItem("resultGame"));
    this.writeResultToDb(this.gameData._id);
  }

  writeResultToDb(id) {
    let finalRes;
    this.resultsData.forEach((element) => {
      finalRes = {
        game: id,
        user: element.userId,
        position: {
          x: element.result.x,
          y: element.result.y,
        },
        difference: element.difference
      };
    });
    
    this.resultService.addResult(finalRes).subscribe(
      (res) => {
        localStorage.removeItem("resultGame");
        return res;
      },
      (err) => err);
    localStorage.removeItem("resultGame");
  }
}

import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { GamesService } from "src/app/services/games.service";
import * as jwtdecode from "jwt-decode";
import { StorageService } from "../../../shared/services/storage.service";
import { ResultDialogComponent } from "../../../shared/components/result-dialog/result-dialog.component";
import { ResultService } from "src/app/services/result.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserModel } from "src/app/shared/interfaces";
import { ResultXY } from "src/app/shared/interfaces/result.model";

@Component({
  selector: "game-component",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  x: number = 0;
  y: number = 0;
  result: ResultXY;
  differencePosition: number;
  width: number;
  height: number;
  @ViewChild("gameBox", null) gameBox: ElementRef;
  @ViewChild("successImage", null) successImage: ElementRef;
  public localStorageUser: string = localStorage.getItem("user");
  public resultsData;
  public gameData: any;

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
          });
        } else if (res.length >= 1) {
          res.forEach((result) => {
            if (result.user === params.userId) {
              let arr = JSON.parse(localStorage.getItem('temporary-result')) || [];
              arr.push({result: result.position, differencePosition: result.difference});
              localStorage.setItem("temporary-result", JSON.stringify(arr));
              
              this.router.navigate(["/result"]);
              return;
            } else if (result.user !== params.userId) {
              this.gamesService.findOneById(params.gameId).subscribe((res) => {
                this.gameData = res;
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
      top: ${this.y - 20}px;
      left: ${this.x - 20}px;
      display: block;
    `;

    const user: UserModel = this.getDecodedUser(this.localStorageUser);
    this.storageService.writeResultInStorage(
      user.id,
      this.result,
      this.differencePosition
    );
    this.openDialog(event.offsetX, event.offsetY, this.differencePosition, this.gameData.imageOriginal);

    let arr = JSON.parse(localStorage.getItem('temporary-result')) || [];
    arr.push({result: this.result, differencePosition: this.differencePosition});
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

    return +res.toFixed(2);
  }

  openDialog(x, y, difference, origImage) {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      width: "80vw",
      height: "1200px",
      data: {
        positionX: x,
        positionY: y,
        difference: difference,
        originalImage: origImage,
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

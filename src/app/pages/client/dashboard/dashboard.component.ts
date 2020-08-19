import { Component, OnInit } from "@angular/core";
import { GamesService } from "src/app/services/games.service";
import * as jwtdecode from "jwt-decode";
import { Router } from "@angular/router";
import { ResultService } from "src/app/services/result.service";
import { GameModel, UserModel } from "src/app/shared/interfaces";
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { HowToPlayComponent } from 'src/app/shared/components/how-to-play/how-to-play.component';

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  
  public gamesFilter: GameModel[] = [];
  public gamesAfterDueDate: GameModel[] = [];
  private localStorageUser: string = localStorage.getItem("user");
  public currentDate = Date.now();

  constructor(
    private gamesService: GamesService,
    private router: Router,
    private resultService: ResultService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.gamesService.getAllImages().subscribe((e) => {
      this.gamesFilter = e.filter((game: GameModel) => {
        if (game.gameType === this.getUserFromLS().gameType) {
          let currDate = moment(this.currentDate).format('MM-DD-YYYY');
          let dateFrom = moment(game.dateFrom).format('MM-DD-YYYY');
          let dateTo = moment(game.dateTo).format('MM-DD-YYYY');
          return dateFrom <= currDate && currDate <= dateTo;
        } else return;
      });

      this.gamesAfterDueDate = e.filter((game: GameModel) => {
        if (game.gameType === this.getUserFromLS().gameType) {
        let currDate = moment(this.currentDate).format('MM-DD-YYYY');
        let dateTo = moment(game.dateTo).format('MM-DD-YYYY');
        return dateTo < currDate;
      } else return;
      })

    });
  }

  getDecodedUser(user: string): any {
    if (user) {
      return jwtdecode(user);
    } else return null;
  }

  getUserFromLS() {
    const user: UserModel = this.getDecodedUser(this.localStorageUser);
    return user;
  }

  gamesFilter3(gameId, userId) {
    this.resultService.getOneById(gameId).subscribe(
      (res) => {
        return this.router.navigate([`/game`], {
          queryParams: { gameId: `${gameId}`, userId: `${userId}` },
        });
      },
      (err) => {
        return err
      }
    );
  }

  writeResult(game) {
    const user = this.getUserFromLS();
    const userId = user.id;
    let gameId = game._id;
    return this.gamesFilter3(gameId, userId);
  }

  howToPlay() {
    const dialogRef = this.dialog.open(HowToPlayComponent, {
      width: "700px",
    });
  }
}

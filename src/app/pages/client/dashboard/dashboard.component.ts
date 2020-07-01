import { Component, OnInit } from "@angular/core";
import { GamesService } from "src/app/services/games.service";
import * as jwtdecode from "jwt-decode";
import { Router } from "@angular/router";
import { ResultService } from "src/app/services/result.service";
import { GameModel, UserModel } from "src/app/shared/interfaces";
import * as moment from 'moment';

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  
  public gamesFilter: GameModel[] = [];
  private localStorageUser: string = localStorage.getItem("user");
  public currentDate = Date.now();

  constructor(
    private gamesService: GamesService,
    private router: Router,
    private resultService: ResultService,
  ) {}

  ngOnInit() {
console.log('date to', Date.parse("2020-06-30T21:00:00.000Z"));
// moment()


    this.gamesService.getAllImages().subscribe((e) => {
      this.gamesFilter = e.filter((game: GameModel) => {
        game.dateFrom

        if (game.gameType === this.getUserFromLS().gameType) {
          
          let currDate = moment(this.currentDate).format('l');
          let dateFrom = moment(game.dateFrom).format('l');
          let dateTo = moment(game.dateTo).format('l');
          console.log('curr date', currDate);
          console.log('dateFrom ', dateFrom);
          console.log('dateTo ', dateTo);
          return dateFrom <= currDate && currDate < dateTo;
          // return ((Date.parse(game.dateFrom) <= this.currentDate && Date.parse(game.dateTo) <= this.currentDate) || (Date.parse(game.dateFrom) <= this.currentDate && Date.parse(game.dateTo) > this.currentDate)
          
        } else return;
      });
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
        console.error(err.message);
      }
    );
  }

  writeResult(game) {
    const user = this.getUserFromLS();
    const userId = user.id;
    let gameId = game._id;
    return this.gamesFilter3(gameId, userId);
  }
}

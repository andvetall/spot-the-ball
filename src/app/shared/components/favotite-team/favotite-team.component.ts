import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { nhlTeams } from '../../constants/nhl.comstant';

@Component({
  selector: 'app-favotite-team',
  templateUrl: './favotite-team.component.html',
  styleUrls: ['./favotite-team.component.scss']
})
export class FavotiteTeamComponent {

  public teams: any = nhlTeams.teamsData

  constructor(
    private dialogRef:MatDialogRef<any>
  ) { }

  selectTeam(team){
    this.dialogRef.close(team);
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FavotiteTeamComponent } from 'src/app/shared/components/favotite-team/favotite-team.component';
import * as jwtdecode from "jwt-decode";

@Component({
  selector: 'app-invite-new',
  templateUrl: './invite-new.component.html',
  styleUrls: ['./invite-new.component.scss']
})
export class InviteNewComponent implements OnInit {
  public formRequest: FormGroup;
  public submitButtonDisabled: boolean = false;
  public requested: boolean = false;
  public oops: boolean = false;
  private teamSelected: any = null;
  private sender: any = null;
  public dotsBlock1: any = [];
  public dotsBlock2: any = [];
  public dotsBlock3: any = [];
  public dotsBlock4: any = [];
  public expansionOpened: boolean = false;
  public howDoesItWork: any = [
    {
      title: "CHOOSE GAME",
      image: "../../../../../assets/images/ticket.png",
      desc: `All of our games run for a week. Choose the
      game that is active for the current week. You
      have until Sunday at Midnight.`
    },
    {
      title: "PLAY GAME",
      image: "../../../../../assets/images/vr-gaming.png",
      desc: `When you play, you have one chance to
      mark on the picture where you think the puck
      is. Use your abilities to deduce the position of
      the puck.`
    },
    {
      title: "WEEKLY WINNER",
      image: "../../../../../assets/images/quality.png",
      desc: `When the week is over, our algorithm
      determines which mark was closest to the
      original puck’s position. The winner who is
      the closest will receive that week’s prize.`
    }
  ]
  public customOptions: any = {
    autoplay: true,
    loop: true,
    autoplayTimeout: 7000,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 2500,
    autoplaySpeed: 2500,
    navText: ['&#8249;', '&#8250;'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


  constructor(
    private _router : Router,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private dialog: MatDialog,
    private rote: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.rote.queryParams.subscribe(res => {
      if(res.token) {
        this.sender = jwtdecode(res.token);
        return
      }
    })
  }

  ngOnInit() {
    this.fillDotsBlocks(this.dotsBlock3, 93);
    this.fillDotsBlocks(this.dotsBlock4, 44);
    this._createForm();
    this.inputHandler();
  }

  fillDotsBlocks(block, amount){
    for(let i = 0; i < amount; i++){
      block.push(i)
    }
  }
  toggleExpansion(p:boolean, velocity: number){
    this.document.defaultView.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
     setTimeout(() => {
       if(this.formRequest){
         this.formRequest.reset();
         this.submitButtonDisabled = false;
       }
       this.expansionOpened = p
     }, velocity)
  }


  public inputHandler(){
    if(!this.formRequest) {
      this.submitButtonDisabled = false;
      return
    }
    if(this.formRequest.status === "INVALID"){
      this.submitButtonDisabled = false;
      return
    } 
    for(let item in this.formRequest){
      if(item.length === 0){
        this.submitButtonDisabled = false;
        return
      }
    }
    this.submitButtonDisabled = true;
  }

  private _createForm(){
    this.formRequest = this._formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      favoriteTeam: ['', [Validators.required, Validators.minLength(3)]],
      rate: ['', [Validators.required]]
    });
  }

  selectTeam() {
    const dialogRef = this.dialog.open(FavotiteTeamComponent, {
      width: "700px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.teamSelected = result;
      if(!result){
        this.formRequest.controls['favoriteTeam'].setValue('')
        return;
      }
      this.formRequest.controls['favoriteTeam'].setValue(`${result.city} ${result.title}`)
    });
  }

  public submitForm(){
    if (this.formRequest.invalid) {
      return;
    }
    const data = Object.assign(this.formRequest.value, {favoriteTeam: `${this.teamSelected.city} ${this.teamSelected.title}`}, {referredBy: this.sender ? this.sender : {senderEmail: "Public"}});
    data.email = data.email.toLocaleLowerCase();
    this._userService.sendRequest(data).subscribe(res => {
      this.requested = true;
    }, err => {
      this.oops = true;
      setTimeout(() => {
        this._router.navigate(['login']);
      }, 3000)})
  }

  loginRedirect() {
    this.formRequest.reset();
    this._router.navigate(['login']);
  }

}

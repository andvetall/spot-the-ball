import { Component, OnInit, ViewChild, ElementRef, Inject } from "@angular/core";
import { Validators, FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { GamesService } from 'src/app/services/games.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})

export class GameForm implements OnInit {

  @ViewChild('image', null) image: ElementRef;
  @ViewChild('input', null) input: ElementRef;
  public form: FormGroup;
  public naturalHeight: number;
  public naturalWidth: number;

  constructor(
    private gamesService: GamesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      _id: new FormControl(this.data._id),  
      title: new FormControl(this.data.title ? this.data.title : null, Validators.required),
      gameType: new FormControl(this.data.gameType ? this.data.gameType : null, Validators.required),
      dateFrom: new FormControl(this.data.dateFrom ? this.data.dateFrom : null, Validators.required),
      dateTo: new FormControl(this.data.dateTo ? this.data.dateTo : null, Validators.required),
      image: new FormControl(this.data.image ? this.data.image : 'https://drive.google.com/uc?export=view&id=', Validators.required),
      imageOriginal: new FormControl(this.data.imageOriginal ? this.data.imageOriginal : 'https://drive.google.com/uc?export=view&id=', Validators.required),
      positionX: new FormControl(this.data.positionX ? this.data.positionX : null, Validators.required),
      positionY: new FormControl(this.data.positionY ? this.data.positionY : null, Validators.required),
    })   
  }

  removeImage() {
    this.form.controls.image.patchValue('');
  }

  submit() {
    this.gamesService.addOneImage(this.form.value).subscribe(res => {
      this.toastr.success('Game created');
    }, err => err);
    this.gamesService.getAllImages().subscribe(res => res, err => err)
  }

  update() {
    this.gamesService.updateGame(this.form.value).subscribe(res => {
      this.toastr.success('Game updated');
    }, err => err);
    this.gamesService.getAllImages().subscribe(res => res, err => err);
  }

}
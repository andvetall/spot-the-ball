import { Component, OnInit, ViewChild, ElementRef, Inject } from "@angular/core";
import { Validators, FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { GamesService } from 'src/app/services/games.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { googleDriveLink } from 'src/app/shared/constants/google.constants';

@Component({
  selector: 'game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})

export class GameForm implements OnInit {

  @ViewChild('image', null) image: ElementRef;
  @ViewChild('input', null) input: ElementRef;
  @ViewChild('img', null) img: any;
  @ViewChild('imgOrig', null) imgOrig: ElementRef;
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
      image: new FormControl(this.data.image ? this.getImageId(this.data.image) : '', [Validators.required, this.imageLinkValidator]),
      imageOriginal: new FormControl(this.data.imageOriginal ? this.getImageId(this.data.imageOriginal) : '', [Validators.required, this.imageLinkValidator]),
      positionX: new FormControl(this.data.positionX ? this.data.positionX : null, Validators.required),
      positionY: new FormControl(this.data.positionY ? this.data.positionY : null, Validators.required),
    })   
  }

  getImageId(link: string) {
    if( !link.includes('https://drive.google.com')) {
      return link;  
    }
    let splitLink = link.split("id=");
    return splitLink[1];
  }

  imageLinkValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value.length < 33) {
        return {'image': true};
    }
    return null;
  }

  setImage() {
    return `${googleDriveLink}${this.form.value.image}`
  }

  setOriginalImage() {
    return `${googleDriveLink}${this.form.value.imageOriginal}`
  }

  submit() {
    if(this.img.nativeElement.naturalHeight === 0 || this.imgOrig.nativeElement.naturalHeight === 0) {
      this.toastr.error('Seems like image Id is incorrect');
      return;
    }
    this.form.controls['image'].setValue(`${googleDriveLink}${this.form.value.image}`)
    this.form.controls['imageOriginal'].setValue(`${googleDriveLink}${this.form.value.imageOriginal}`)
    this.gamesService.addOneImage(this.form.value).subscribe(res => {
      this.toastr.success('Game created');
    }, err => err);
    this.gamesService.getAllImages().subscribe(res => res, err => err)
  }

  update() {
    if(this.img.nativeElement.naturalHeight === 0 || this.imgOrig.nativeElement.naturalHeight === 0) {
      this.toastr.error('Seems like image Id is incorrect');
      return;
    }
    this.form.controls['image'].setValue(`${googleDriveLink}${this.form.value.image}`)
    this.form.controls['imageOriginal'].setValue(`${googleDriveLink}${this.form.value.imageOriginal}`)
    this.gamesService.updateGame(this.form.value).subscribe(res => {
      this.toastr.success('Game updated');
    }, err => err);
    this.gamesService.getAllImages().subscribe(res => res, err => err);
  }

}
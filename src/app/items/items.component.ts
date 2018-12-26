import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StarWarsService } from "../star-wars.service";
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  @Input() character;
  // @Output() sideAssigned = new EventEmitter<{name:string, side: string}>();
  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }
  ngOnInit() {
  }

  onAssign(side) {
    // this.character.side = side;
    // this.sideAssigned.emit({name: this.character.name, side: side})
    this.swService.onSideChoosen({name: this.character.name, side: side})
  }

}

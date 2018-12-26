import { LogService } from "./log.service";
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map'


@Injectable()
export class StarWarsService {
  private characters = [
    { name: "Luke Skaywalker", side: '' },
    { name: "Darth Vader", side: '' }
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: Http;


  constructor(logService: LogService, http: Http) {
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters() {
    this.http.get('https://swapi.co/api/people/')
    .map((response: Response) => {
      const data = response.json();
      const extractedChars = data.results;
      const chars = extractedChars.map((char) => {
        return {name: char.name, side: ''}
      })
      return chars;
    })
    .subscribe(
      (data) => {
        console.log(data);
        this.characters = data;
        this.charactersChanged.next();
      }
    )
  }

  getCharacters(choosenList) {
    if(choosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === choosenList;
    })
  }

  onSideChoosen(charInf) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInf.name;
    })

    this.characters[pos].side = charInf.side;
    this.charactersChanged.next();
    this.logService.writeLog('changed side of ' +charInf.name+', new side is '+charInf.side);
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    })
    if (pos !== -1) {
      return;
    }
    const newChar = {'name': name, 'side': side};
    this.characters.push(newChar);
    console.log(this.characters)
  }
}

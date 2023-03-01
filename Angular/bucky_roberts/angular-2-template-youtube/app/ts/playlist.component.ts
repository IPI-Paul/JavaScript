import {Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';

@Component({
  selector: 'playlist'
  ,templateUrl: 'app/html/playlist.component.html'
})

export class PlaylistComponent implements OnInit {
  @Input() video: string; 
  isUrl: boolean;
  
  ngOnInit(): void {
    if (`${this.video}`.startsWith("file:")) {
      this.isUrl = true;
    }
  }
}
import {Component} from 'angular2/core';
import {Config} from './config.service'
import {Video} from './video';
import {PlaylistComponent} from './playlist.component';
import {BaseRequestOptions, Http} from 'angular2/http';

@Component({
    selector: 'my-app'
    ,templateUrl: 'app/html/app.component.html'
    ,styleUrls: ['app/css/app.component.css']
    ,directives: [PlaylistComponent]
})

export class AppComponent {
    mainHeading = Config.MAIN_HEADING;
    videos: Array<Video>;
    idx: number;

    constructor() {
        this.videos = [
            new Video(1, 'Angular 2 Pt1', 'file:/run/media/paul/3830-6532/Tutorials/Angular/Angular 2 for Beginners - Tutorial 1 - Getting Started.mp4', 'Tutorial 1')
            ,new Video(2, 'Angular 2 Pt2', 'file:/run/media/paul/3830-6532/Tutorials/Angular/Angular 2 for Beginners - Tutorial 2 - Overview and Core Concepts.mp4', 'Tutorial 2')
        ];
    }

    setId(idx: number) {
      this.idx = idx;
      console.log(this.videos.find(x => x.id === this.idx)); 
    }      
}
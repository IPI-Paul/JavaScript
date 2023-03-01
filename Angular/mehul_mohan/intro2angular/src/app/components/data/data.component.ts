import { Component, OnInit } from '@angular/core';
import { RecordsService } from 'src/app/services/records.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  records: any = [];

  constructor(private recordService: RecordsService) { }

  ngOnInit(): void {
    this.recordService.getData()
    .subscribe(data => {  
      this.records = data.obj;   
    });
  }

}

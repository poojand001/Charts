import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
//import {FirebaseService} from '../services/firebase.service';
@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css']
})
export class MyBarChartComponent implements OnInit {
  complaints;
  current = new Date().getTime();
  countRTO = 0;
  countSanitation = 0;
  countWater = 0;
  countRoad = 0;
  showSpinner = false;
  barChartData;
  
  constructor(private db: AngularFireDatabase    
    ) { 
    this.db.list('/twittercomplaints')
      .valueChanges().subscribe(data => {
         this.complaints = data;
         this.countRTO = 0;
         this.countSanitation = 0;
         this.countWater = 0;
         this.countRoad = 0;
        
        for(let i = 0; i < this.complaints.length;i++) {
          console.log(this.complaints[i].Type)
          if(this.complaints[i].approved=='false')
          {  
             console.log('flase');
             continue;
          }
          
          if(this.complaints[i].Type.toLowerCase().search('rto')>-1) 
            {this.countRTO++;
              console.log('here')}
          else if(this.complaints[i].Type.toLowerCase().search('sanitation') > -1 ) 
          this.countSanitation++;
          else if(this.complaints[i].Type.toLowerCase().search('water') > -1) 
          this.countWater++;
          else if(this.complaints[i].Type.toLowerCase().search('road') > -1) 
          this.countRoad++;
        }
        console.log(this.countRTO);
        console.log(this.countSanitation);
        console.log(this.countRoad);
        console.log(this.countWater);
        this.barChartData = [
          {data: [this.countRTO,this.countSanitation,this.countWater,this.countRoad], label: 'Series A'},
          
        ];
        this.showSpinner = true;
        console.log(data);
      });
  }
  

  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{ticks: {beginAtZero: true}}]
    }
  };

  public barChartLabels = ['RTO','Sanitation','Water','Road'];
  public barChartType = 'bar';
  public barChartLegend = true;

  
  //  public barChartData = [
  //   {data: [0, 19, 2, 5], label: 'Series A'},
    
  // ];

 

  ngOnInit() {
    
    
  }

}

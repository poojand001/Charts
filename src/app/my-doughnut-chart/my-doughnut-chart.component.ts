import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
@Component({
  selector: 'app-my-doughnut-chart',
  templateUrl: './my-doughnut-chart.component.html',
  styleUrls: ['./my-doughnut-chart.component.css']
})
export class MyDoughnutChartComponent implements OnInit {
  complaints;
  current = new Date().getTime();
  countRTO = 0;
  countSanitation = 0;
  countWater = 0;
  countRoad = 0;
  doughnutChartData;
  showSpinner = false;
  
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
        this.doughnutChartData = [this.countRTO,this.countSanitation,this.countWater,this.countRoad];
          
        
        this.showSpinner = true;
        console.log(data);
      });
  }
  public doughnutChartLabels = ['RTO','Sanitation','Water','Road'];
 
  public doughnutChartType = 'doughnut';

  ngOnInit() {
  }

}

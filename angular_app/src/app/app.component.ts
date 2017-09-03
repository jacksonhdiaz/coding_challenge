import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Chart } from 'chart.js/src/Chart.js';
import { Tweet } from './classes/tweet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  tweets: Tweet[];
  myChart:Chart;

  constructor(private dataService:DataService){
    this.showTweets('#liveperson');
  }

  showTweets(topic:string){
    if(topic){
      this.dataService.getData(topic).subscribe(
        (response) => {
         this.tweets = response;
          this.updateChart();
        }
      )
    }
  }

  updateChart(){
    let favoriteCount:number = 0;
    let retweetCount:number = 0;
    let ctx = document.getElementById("myChart");

    for (let tweet of this.tweets) {
      favoriteCount += tweet.favorite_count;
      retweetCount += tweet.retweet_count;
    }

    if(this.myChart != null){
      this.myChart.destroy();
    }

    this.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Tweets", "Retweet count", "Favorite count"],
            datasets: [{
                label: 'Count',
                data: [this.tweets.length, retweetCount, favoriteCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }
}





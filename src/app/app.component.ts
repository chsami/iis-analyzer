import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IIpTotalCalls } from '../models/iislog.model';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    chart: any;
    ipTotalCalls: IIpTotalCalls[] = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
    }

    public handleFiles(event) {
        let files: FileList = event.target.files;
        for (let i = 0; i < files.length; i++) {
            let input = new FormData();
            input.append("file", files[i], files[i].name);
            this.http.post(environment.iisApiUrl + 'ips/total/calls', input).subscribe((result: IIpTotalCalls[]) => {
                this.ipTotalCalls = result;
                this.generateGraph();
            });
        }
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    public generateGraph() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: this.ipTotalCalls.map(x => x.ip),
                datasets: [
                    {
                        label: "Total calls",
                        backgroundColor: this.ipTotalCalls.map(x => this.getRandomColor()),
                        data: this.ipTotalCalls.map(x => x.total)
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{ stacked: true }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        stacked: false
                    }]
                }
            }
        });
    }
}

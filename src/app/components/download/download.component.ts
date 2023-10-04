import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ChartOptions } from 'chart.js';
export interface UserData {
  id: string;
  name: string;
  date: string;
  progress: string;
  action: string;
}


/** Constants used to fill up our data base. */

const NAMES: string[] = [
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
  'file',
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
  title = 'ng2-charts-demo';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels =  [ 'Approved Task' , 'Rejected Task','Pending Task' ];
  public pieChartDatasets = [ {
    data: [ 800,200,100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }

}

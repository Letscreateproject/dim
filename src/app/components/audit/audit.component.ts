import { Component } from '@angular/core';
import { Constants } from 'src/app/_services/constants';
import { NotifierService } from 'src/app/_services/notifier/notifier.service';

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Voucher1.xlsx' },
  { position: 2, name: 'Voucher2.xlsx' },
  { position: 3, name: 'Voucher3.xlsx' },
  { position: 4, name: 'Voucher4.xlsx' },
  { position: 5, name: 'Voucher5.xlsx' },
  { position: 6, name: 'Voucher6.xlsx' },
  { position: 7, name: 'Voucher7.xlsx' },
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export interface IColumn {
  field: string;
  header: string;
  hidden?: boolean;
  type?: string;
  date?: Date;
}

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss'],
})
export class AuditComponent {
  fieldArray: any[] = [];
  constructor(private notifer: NotifierService) {}
  column!: IColumn;
  title = 'angular-material-app';
  columns: IColumn[] = [
    {
      field: 'position',
      header: 'No.',
    },
    {
      field: 'name',
      header: 'Voucher Name',
    },

    // ,
    {
      field: 'textbox',
      header: 'Comments',
      type: 'textbox',
    },

    {
      field: 'action',
      header: 'Status',
      type: 'action',
    },
    {
      field: 'viewIconAction',
      header: 'View ',
      type: 'viewIconAction',
      // hidden:true,
    },
    {
      field: 'downloadIconAction',
      header: 'Download ',
      type: 'downloadIconAction',
      // hidden:true,
    },
    {
      field: 'status',
      header: '',
      type: 'status',
    },
  ];
  dataSource = JSON.parse(JSON.stringify(ELEMENT_DATA));
  displayedColumns = this.columns.map((c) => c.field);

  buttonAction(e: any) {
    // debugger
    // ELEMENT_DATA.splice(e.i,1);
    // this.dataSource = JSON.parse( JSON.stringify(ELEMENT_DATA));
    if (e.action == 'Approve') {
      this.notifer.notify(
        e.name + ' Approved Successfully',
        Constants.SUCCESS_NOTIFIER
      );
    } else if (e.action == 'Reject') {
      this.notifer.notify(
        e.name + ' Rejected Successfully',
        Constants.SUCCESS_NOTIFIER
      );
    }
  }
}

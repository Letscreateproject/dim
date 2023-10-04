import { Component } from '@angular/core';
import { CommonService } from 'src/app/_services/common/common.service';
import { Constants } from 'src/app/_services/constants';
import { NotifierService } from 'src/app/_services/notifier/notifier.service';
import { saveAs } from 'file-saver';

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
  columns: IColumn[] = [
    {
      field: 'position',
      header: 'No.',
    },
    {
      field: 'voucherFileName',
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
  displayedColumns = this.columns.map((c) => c.field);
  dataSource = JSON.parse(JSON.stringify(ELEMENT_DATA));
  constructor(
    private commonSvc: CommonService,
    private notifer: NotifierService
  ) {}

  ngOnInit(): void {
    this.getDocList();
  }
  column!: IColumn;
  title = 'angular-material-app';
  buttonAction(e: any) {
    // debugger
    // ELEMENT_DATA.splice(e.i,1);
    // this.dataSource = JSON.parse( JSON.stringify(ELEMENT_DATA));
    if (e.action == 'Approve') {
      this.takeAction(e.id, true);
    } else if (e.action == 'Reject') {
      this.takeAction(e.id, false);
    } else if (e.action == 'view') {
      const blob = this.commonSvc.base64ToBlob(
        e.voucherFileBytes,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      const url = URL.createObjectURL(blob);

      const popup = window.open(url, 'Excel Viewer', 'width=800,height=600');

      URL.revokeObjectURL(url); // Clean up the URL when done
    } else {
      const blob = this.commonSvc.base64ToBlob(
        e.voucherFileBytes,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = e.voucherFileName; // Set the desired file name
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  getDocList() {
    this.commonSvc.getDocList().subscribe({
      next: (data: any) => {
        this.dataSource = JSON.parse(JSON.stringify(data));
      },
      error: (e: any) => {
        //error
        this.notifer.notify('ERROR', Constants.ERROR_NOTIFIER);
      },
    });
  }

  takeAction(id: any, type: any) {
    const obj = { id, type };
    this.commonSvc.takeAction(obj).subscribe({
      next: (data: any) => {
        let msg = 'Approved Successfully.';
        if (!type) {
          msg = 'Rejected Successfully.';
        }

        this.notifer.notify(msg, Constants.SUCCESS_NOTIFIER);
        this.getDocList();
      },
      error: (e: any) => {
        //error
        this.notifer.notify('ERROR', Constants.ERROR_NOTIFIER);
      },
    });
  }
}

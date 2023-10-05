import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common/common.service';
import { Constants } from 'src/app/_services/constants';
import { NotifierService } from 'src/app/_services/notifier/notifier.service';
import { AuditComponent } from '../audit/audit.component';
import { Subject } from 'rxjs';

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
  showheader?:boolean;
}


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  // directives: [AuditComponent]

})

export class UploadComponent {
  files: any[] = [];
  userName: any;
  constructor(
    private notifer: NotifierService,
    private commonSvc: CommonService,
    private router: Router
  ) {}
  
  @ViewChild(AuditComponent) child:AuditComponent | undefined;
  /**
   * on file drop handler
   */
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
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files);
  }
  submit() {
    return;
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }
  browseFile(event: any) {
    // debugger
    if (
      event.target.files[0].type ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      this.submitFile(event.target.files[0]);
    } else {
      this.notifer.notify(
        'Voucher Must be in Excel Format',
        Constants.ERROR_NOTIFIER
      );
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

  ngOnInit(): void {
    this.getDocList();
    
    this.userName = localStorage.getItem('Username')
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  submitFile(payload: any) {
    this.commonSvc.uploadFile(payload).subscribe({
      next: (data: any) => {
        //success
        this.notifer.notify(
          'Voucher Uploaded Successfully',
          Constants.SUCCESS_NOTIFIER
        );
        
        this.ngOnInit();

      },
      error: (e: any) => {
        //error
        this.notifer.notify('Error in uploading', Constants.ERROR_NOTIFIER);
      },
    });
    
  }
  buttonAction(e: any) {
    // debugger
    // ELEMENT_DATA.splice(e.i,1);
    // this.dataSource = JSON.parse( JSON.stringify(ELEMENT_DATA));
  if (e.action == 'view') {
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
}



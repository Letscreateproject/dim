import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonService } from 'src/app/_services/common/common.service';
import { Constants } from 'src/app/_services/constants';
import { NotifierService } from 'src/app/_services/notifier/notifier.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  files: any[] = [];
  constructor(
    private notifer: NotifierService,
    private commonSvc: CommonService
  ) {}
  /**
   * on file drop handler
   */
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
      },
      error: (e: any) => {
        //error
        this.notifer.notify('Error in uploading', Constants.ERROR_NOTIFIER);
      },
    });
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/_services/common/common.service';
import { Constants } from 'src/app/_services/constants';
import { NotifierService } from 'src/app/_services/notifier/notifier.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit, OnChanges {
  displayedColumns: any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  showStatus: boolean = true;
  approve: any;
  reject: any;

  constructor(
    private commonSvc: CommonService,
    private notifer: NotifierService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    // debugger
    if (changes['columns']?.currentValue) {
      this.displayedColumns = [];
      if (this.order === 1) {
        this.columns = this.columns.reverse();
      }
      this.columns.forEach((a) => {
        if (!a.hidden) {
          this.displayedColumns.push(a.field);
        }
      });
      console.log(this.displayedColumns);
    }
    if (changes['order']?.currentValue) {
    }
    if (changes['data']?.currentValue) {
      this.setTableDataSource(this.data);
    }
  }

  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() isPageable!: boolean;
  @Input() isSortable!: boolean;
  @Input() isFilterable!: boolean;
  @Input() rowActionIcon!: string[];
  @Input() ViewIconAction!: boolean;
  @Input() downloadAction!: boolean;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[0];
  @Input() order: number = 0;

  @Output() sortevent: EventEmitter<Sort> = new EventEmitter();
  @Output() pageevent: EventEmitter<PageEvent> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.showStatus = true;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setTableDataSource(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    // sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active).dataKey;
    // /this.sort.emit(sortParameters);
  }

  pageChange(event: PageEvent) {
    // this.pageevent.emit(event)
  }

  emitRowAction(row: any, action: string, i: number) {
    // debugger;
    let index = row.position;
    const data = { ...row, action, i };
    this.rowAction.emit(data);
    this.showStatus = false;
    if (data.action == 'Approve') {
      row.value = true;
      row.index = true;
    }
    if (data.action == 'Reject') {
      row.value = false;
      row.index = true;
    }

    // debugger;
  }
  emitIconAction(row: any, action: string) {
    const data = { ...row, action };
    this.rowAction.emit(data);
  }
}

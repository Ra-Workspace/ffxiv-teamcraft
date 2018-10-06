import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ProgressPopupComponent } from './progress-popup/progress-popup.component';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class ProgressPopupService {

  constructor(private dialog: NzModalService, private translate: TranslateService) {
  }

  public showProgress(operation$: Observable<any>, operationsCount: number, labelKey = 'List_popup_p', labelParams = {}): Observable<any> {
    return this.dialog.create({
      nzTitle: this.translate.instant(labelKey, labelParams),
      nzFooter: null,
      nzClosable: false,
      nzContent: ProgressPopupComponent,
      nzComponentParams: { operation$: operation$.pipe(shareReplay(1)), count: operationsCount }
    }).afterClose;
  }
}

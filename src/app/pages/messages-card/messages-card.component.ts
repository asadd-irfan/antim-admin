import { Component, OnInit } from '@angular/core';
import { AdminAPIsService } from 'app/services/admin-apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, AdminState } from './../../store/app.states';
import { ReadMessage } from './../../store/actions/admin.actions';

@Component({
  selector: 'app-messages-card',
  templateUrl: './messages-card.component.html',
  styleUrls: ['./messages-card.component.scss']
})
export class MessagesCardComponent implements OnInit {
    allMessages: any;
    NoDataFound = false;
    adminMessages: any = [];

    messagesType: any[] = [
      {
        type: 'Null'
      },
      {
        type: 'Suggestions'
      },
      {
        type: 'Report a Bug '
      },
      {
        type: 'Feature Request'
      },
      {
        type: 'Feedback'
      },
      {
        type: 'Others'
      }
    ]
    getState: Observable<any>;

    constructor(
      private adminApiService: AdminAPIsService,
      private spinner: NgxSpinnerService,
      private store: Store<AppState>,
    ) {
      this.getState = this.store.select(AdminState);
    }

    ngOnInit() {
      this.spinner.show();
      this.adminApiService.GetAllMessages().subscribe(res => {
        this.spinner.hide();
        console.log(res);
        if (res.message) {
          this.NoDataFound = true;
        } else {
        this.allMessages = res.result;
        if (this.allMessages.length > 0) {
          this.adminMessages.length = 0;
          this.allMessages.forEach(element => {
            this.adminMessages.push(element);
            element.date = moment(element.createdAt).format('LL');
            element.messagetype = this.messagesType[element.commentType].type;
            if (element.message.length > 250) {
              element.trimMsg = element.message.substring(0, 250);
              element.fullMessage = false;
              element.trimMessage = true;
            } else {
              element.fullMessage = true;
              element.trimMessage = false;
            }
          });
          console.log(this.adminMessages);
        }
      }
      }, err => {
        this.spinner.hide();
        console.log(err);
      });

    }
    showFullmsg(id) {
      this.adminMessages.map(el => {
        if (el.id == id) {
          el.fullMessage = true;
          el.trimMessage = false;
        }
        return el;
      })
    }
    markAsRead(id: any) {
      this.adminApiService.readContactMessageById(id).subscribe(res => {
        this.ngOnInit();
        console.log(res);
        this.store.dispatch(new ReadMessage(1));
      }, err => {
        console.log(err);
      });
    }


}

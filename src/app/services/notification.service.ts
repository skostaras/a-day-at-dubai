import { Injectable } from '@angular/core';
import { IAlert } from 'app/components/notification/notification.component';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {

    private subject = new Subject<any>();

    constructor() {
    }

    successNotification(message: string) {

        let successAlert: IAlert;
        successAlert = {
            id: 1,
            type: 'success',
            strong: 'Success',
            message: message,
            icon: 'ui-1_check',
        }

        this.subject.next({ alert: successAlert });
    }

    errorNotification(message: string) {

        let errorAlert: IAlert;
        errorAlert = {
            id: 2,
            type: 'danger',
            strong: 'Error',
            message: message,
            icon: 'ui-1_simple-remove',
        }

        this.subject.next({ alert: errorAlert });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
}

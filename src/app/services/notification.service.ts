import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NotificationCustom } from '../models/notification-custom';

@Injectable({ providedIn: 'root' })
export class NotificationService {

    private subject = new Subject<any>();

    constructor() {
    }

    successNotification(message: string) {
        let successNotification: NotificationCustom;
        successNotification = {
            id: 1,
            type: 'success',
            strong: 'Success',
            message: message,
            icon: 'ui-1_check',
        }

        this.subject.next({ notification: successNotification });

        setTimeout(() => {
            this.subject.next({ notification: null });
        }, 5000);
    }

    errorNotification(message: string) {
        let errorNotification: NotificationCustom;
        errorNotification = {
            id: 2,
            type: 'danger',
            strong: 'Error',
            message: message,
            icon: 'business_bulb-63',
        }

        this.subject.next({ notification: errorNotification });
        setTimeout(() => {
            this.subject.next({ notification: null });
        }, 8000);
    }

    infoNotification(message: string) {
        let infoNotification: NotificationCustom;
        infoNotification = {
            id: 3,
            type: 'info',
            strong: 'Heads up',
            message: message,
            icon: 'travel_info',
        }

        this.subject.next({ notification: infoNotification });

        setTimeout(() => {
            this.subject.next({ notification: null });
        }, 5000);
    }

    getNotification(): Observable<any> {
        return this.subject.asObservable();
    }
}

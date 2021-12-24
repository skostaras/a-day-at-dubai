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

        setTimeout(() => {
            this.subject.next({ alert: null });
        }, 5000);
    }

    errorNotification(message: string) {
        let errorAlert: IAlert;
        errorAlert = {
            id: 2,
            type: 'danger',
            strong: 'Error',
            message: message,
            icon: 'business_bulb-63',
        }

        this.subject.next({ alert: errorAlert });
        setTimeout(() => {
            this.subject.next({ alert: null });
        }, 8000);
    }


    infoNotification(message: string) {
        let infoAlert: IAlert;
        infoAlert = {
            id: 3,
            type: 'info',
            strong: 'Heads up',
            message: message,
            icon: 'travel_info',
        }

        this.subject.next({ alert: infoAlert });

        setTimeout(() => {
            this.subject.next({ alert: null });
        }, 5000);
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
}

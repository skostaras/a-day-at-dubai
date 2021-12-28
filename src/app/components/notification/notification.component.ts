import { Input, Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';
import { NotificationCustom } from '../../models/notification-custom';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {

    @Input()
    public notification: NotificationCustom;

    constructor(
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.notificationService.getNotification().subscribe((response) => {
            this.notification = response.notification;
        });
    }

    public closeNotification() {
        this.notification = null;
    }
}
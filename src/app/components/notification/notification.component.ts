import { Input, Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {

    @Input()
    public alert: IAlert;

    constructor(
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.notificationService.getAlert().subscribe((response) => {
            this.alert = response.alert;
        });
    }

    public closeAlert() {
        this.alert = null;
    }
}

export interface IAlert {
    id: number;
    type: string;
    strong?: string;
    message: string;
    icon?: string;
}

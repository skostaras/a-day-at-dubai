import { Input, Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {
    @Input()
    public alerts: Array<IAlert> = [];
    private backup: Array<IAlert>;

    alert: IAlert;

    constructor(
        private notificationService: NotificationService
    ) {
        // this.alerts.push({
        //     id: 1,
        //     type: 'success',
        //     strong: 'Well done!',
        //     message: 'You successfully read this important alert message.',
        //     icon: 'ui-2_like'
        // }, {
        //     id: 2,
        //     strong: 'Heads up!',
        //     type: 'info',
        //     message: 'This is an info alert',
        //     icon: 'travel_info'
        // }, {
        //     id: 3,
        //     type: 'warning',
        //     strong: 'Warning!',
        //     message: 'This is a warning alert',
        //     icon: 'ui-1_bell-53'
        // }, {
        //     id: 4,
        //     type: 'danger',
        //     strong: 'Oh snap!',
        //     message: 'This is a danger alert',
        //     icon: 'objects_support-17'
        // });
        // this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
    }

    ngOnInit() {
        this.notificationService.getAlert().subscribe((response) => {
            this.alert = response.alert;
        });


    }

    public closeAlert(alert: IAlert) {
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

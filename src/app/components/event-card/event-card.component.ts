import { Component, Input } from '@angular/core';
import { Event } from 'src/app/models/event';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {

  @Input() event: Event;

  constructor(private spinnerService: Ng4LoadingSpinnerService,
    private eventService: EventService) { }

  private updateEvent(status: string) {
    this.spinnerService.show();
    this.eventService.updateEvent(this.event.uuid, status)
      .subscribe(
        ({ data }) => {
          if (data && data['updateEvent']) {
            this.event = data['updateEvent'];
          }
          this.spinnerService.hide();
        },
        error => {
          console.log(error);
          this.spinnerService.hide();
        });
  }
}

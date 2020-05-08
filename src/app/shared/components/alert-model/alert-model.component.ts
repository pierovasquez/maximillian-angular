import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-model',
  templateUrl: './alert-model.component.html',
  styleUrls: ['./alert-model.component.scss']
})
export class AlertModelComponent {
  @Input() message: string;
  @Output() closeAlert = new EventEmitter<void>();

  onClose() {
    this.closeAlert.next();
  }
}

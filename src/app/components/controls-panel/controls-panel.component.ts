import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controls-panel',
  templateUrl: './controls-panel.component.html',
  styleUrls: ['./controls-panel.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ControlsPanelComponent {
  @Input() indicators: any[] = [];
  @Input() years: number[] = [];
  @Input() selectedIndicator: any;
  @Input() selectedYear: any;
  @Output() selectedIndicatorChange = new EventEmitter<any>();
  @Output() selectedYearChange = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<void>();

  onSelectionChange() {
    this.selectionChange.emit();
  }
}
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-legend-panel',
  templateUrl: './legend-panel.component.html',
  styleUrls: ['./legend-panel.component.css'],
  standalone: true
})
export class LegendPanelComponent {
  @Input() mapData: any; 
}
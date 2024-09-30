import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [],
  templateUrl: './placeholder.component.html',
  styleUrl: './placeholder.component.css'
})
export class PlaceholderComponent {
  @Input() image: string |undefined;
  @Input() title: string |undefined;
  @Input() subtitle: string |undefined;
}

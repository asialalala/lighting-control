import { Component, Input } from '@angular/core';
import { Bulb } from '../../models/bulb';

@Component({
  selector: 'app-bulb',
  standalone: true,
  imports: [],
  templateUrl: './bulb.component.html',
  styleUrl: './bulb.component.css'
})
export class BulbComponent {
  @Input() bulb!: Bulb;
}

import { Component, Input } from '@angular/core';
import { Bulb } from '../../models/bulb';
import { RouterLink, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-bulb',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './bulb.component.html',
  styleUrl: './bulb.component.css'
})
export class BulbComponent {
  @Input() bulb!: Bulb;
}

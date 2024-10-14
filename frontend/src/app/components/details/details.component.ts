import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {BulbComponent} from '../bulb/bulb.component';
import { Bulb } from '../../models/bulb';
import { BulbService } from '../../services/bulb.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  bulb: Bulb | undefined;
  bulbService = inject(BulbService)
  
  constructor() {
      const bulbId = Number(this.route.snapshot.params['id']);
      this.bulb = this.bulbService.getBulbById(bulbId);
      }

}

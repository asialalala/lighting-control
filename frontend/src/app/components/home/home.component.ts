import { Component, inject } from '@angular/core';
import { BulbComponent } from '../bulb/bulb.component';
import { CommonModule } from '@angular/common';
import { Bulb } from '../../models/bulb';
import { BulbService } from '../../services/bulb.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BulbComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  bulbList: Bulb[] = [];
  bulbService: BulbService = inject(BulbService);
  
  constructor(){
    this.bulbList = this.bulbService.getAllBulbs();
  }
}

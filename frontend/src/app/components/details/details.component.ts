import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BulbComponent } from '../bulb/bulb.component';
import { Bulb } from '../../models/bulb';
import { BulbService } from '../../services/bulb.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  bulb: Bulb | undefined;
  bulbService = inject(BulbService)
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const bulbId = Number(this.route.snapshot.params['id']);
    this.bulb = this.bulbService.getBulbById(bulbId);
  }

  submitApplication() {
    this.bulbService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }

}

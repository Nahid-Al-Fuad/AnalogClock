import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { CLOCK_CONSTANTS as cc } from './clock.constants';
import { MockTimeService } from '../services/mock-time-service';

@Component({
  selector: 'app-clock-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock-component.html',
  styleUrls: ['./clock-component.scss']
})
export class ClockComponent implements OnInit {
  // ✅ reactive signals
  hours = signal(0);
  minutes = signal(0);
  seconds = signal(0);

  clockNumbers = this.generateClockNumbers();

  constructor(private timeService: MockTimeService) {}

  ngOnInit() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  generateClockNumbers() {
    const numbers = [];
    const centerOffset = cc.CENTER_OFFSET;
    const radius = cc.RADIUS;

    for (let n = 1; n <= 12; n++) {
      const angle = (n - 3) * cc.DEGREES_PER_HOUR * cc.DEG_TO_RAD;
      const top = centerOffset + radius * Math.sin(angle);
      const left = centerOffset + radius * Math.cos(angle);

      numbers.push({
        number: n,
        position: { top: `${top}%`, left: `${left}%` }
      });
    }
    return numbers;
  }

  updateClock() {
    const now = this.timeService.getCurrentTime();

    this.hours.set(
      (now.getHours() % 12) * cc.DEGREES_PER_HOUR +
      now.getMinutes() * cc.MINUTE_ADJUSTMENT +
      cc.OFFSET_ROTATION
    );

    this.minutes.set(
      now.getMinutes() * cc.DEGREES_PER_MINUTE_SECOND +
      now.getSeconds() * cc.SECOND_ADJUSTMENT +
      cc.OFFSET_ROTATION
    );

    this.seconds.set(
      now.getSeconds() * cc.DEGREES_PER_MINUTE_SECOND +
      cc.OFFSET_ROTATION
    );
  }
}

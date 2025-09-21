import { Component, signal } from '@angular/core';
import { ClockComponent } from './clock-component/clock-component';

@Component({
  selector: 'app-root',
  imports: [ClockComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('clock');
}

import { Component } from '@angular/core';
import { StreaksComponent } from './features/streaks/streaks.component';

@Component({
  selector: 'app-root',
  imports: [StreaksComponent],
  template: '<app-streaks></app-streaks>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fitlog-streaks';
}

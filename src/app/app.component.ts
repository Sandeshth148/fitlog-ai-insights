import { Component } from '@angular/core';
import { StreaksComponent } from './features/streaks/streaks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StreaksComponent],
  template: '<app-insights></app-insights>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fitlog-ai-insights';
}

import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Impure to update on language change
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private subscription?: Subscription;

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    // Subscribe to language changes to trigger pipe re-evaluation
    this.subscription = this.translationService.currentLanguage.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  transform(key: string): string {
    return this.translationService.translate(key);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';
import { WeightEntry } from '../weight-tracker/models/weight-entry.model';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="insights-container">
      <div class="insights-header">
        <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="url(#brainGradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
          <path d="M5.636 5.636l2.828 2.828M15.536 15.536l2.828 2.828M5.636 18.364l2.828-2.828M15.536 8.464l2.828-2.828" />
          <path d="M12 9c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" fill="url(#brainGradient)" stroke="none" />
        </svg>
        <h1 class="gradient-text">AI Fitness Insights</h1>
        <p class="subtitle">Personalized recommendations powered by AI</p>
      </div>

      <div class="insights-grid" *ngIf="!loading && insights.length > 0">
        <div class="insight-card" *ngFor="let insight of insights">
          <div class="insight-icon" [innerHTML]="insight.icon"></div>
          <h3>{{ insight.title }}</h3>
          <p>{{ insight.message }}</p>
          <div class="insight-footer" *ngIf="insight.action">
            <span class="insight-action">{{ insight.action }}</span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div class="loading-state" *ngIf="loading">
        <div class="spinner"></div>
        <p>Analyzing your fitness data...</p>
      </div>

      <!-- Empty State -->
      <div class="empty-state" *ngIf="!loading && insights.length === 0">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="emptyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="url(#emptyGradient)"/>
        </svg>
        <h3>Start Tracking to Get Insights</h3>
        <p>Log your weight entries to receive personalized AI-powered fitness recommendations</p>
      </div>
    </div>
  `,
  styles: [`
    .insights-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 1.5rem;
    }

    .insights-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .header-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto 0.5rem;
      display: block;
      filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.3));
    }

    .gradient-text {
      font-size: 2.25rem;
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.25rem;
      font-weight: 800;
      font-family: 'Outfit', sans-serif;
    }

    .subtitle {
      color: var(--color-text-secondary);
      font-size: 1rem;
    }

    .insights-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 800px;
      margin: 0 auto 2.5rem;
    }

    .insight-card {
      background: var(--color-card-bg, var(--color-surface));
      backdrop-filter: blur(var(--glass-blur)) saturate(180%);
      -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
      border: 1px solid var(--color-card-border, var(--glass-border));
      border-radius: 18px;
      padding: 1.25rem 1.5rem;
      box-shadow: var(--glass-shadow);
      border-left: 5px solid var(--color-primary) !important;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .insight-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
      border-color: rgba(var(--color-primary-rgb), 0.3);
    }

    .insight-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.05));
    }

    .insight-icon svg {
      width: 100%;
      height: 100%;
    }

    .insight-card h3 {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 0.5rem;
      font-family: 'Outfit', sans-serif;
    }

    .insight-card p {
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 1.25rem;
      font-size: 0.95rem;
    }

    .insight-footer {
      display: flex;
      justify-content: flex-start;
    }

    .insight-action {
      color: #ffffff;
      background: var(--gradient-primary);
      padding: 0.5rem 1.25rem;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.825rem;
      cursor: pointer;
      display: inline-block;
      transition: all 0.25s ease;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.2);
    }
    
    .insight-action:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(var(--color-primary-rgb), 0.3);
      color: #ffffff;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      gap: 1.25rem;
      background: var(--color-surface);
      backdrop-filter: blur(var(--glass-blur)) saturate(180%);
      -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      box-shadow: var(--glass-shadow);
      max-width: 600px;
      margin: 2rem auto;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(var(--color-primary-rgb), 0.1);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-state p {
      color: var(--color-text-secondary);
      font-size: 1.1rem;
      margin: 0;
      font-weight: 500;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--color-surface);
      backdrop-filter: blur(var(--glass-blur)) saturate(180%);
      -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      box-shadow: var(--glass-shadow);
      max-width: 600px;
      margin: 2rem auto;
    }

    .empty-state svg {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      display: block;
      filter: drop-shadow(0 4px 10px rgba(99, 102, 241, 0.2));
    }

    .empty-state h3 {
      font-size: 1.5rem;
      color: var(--color-text-primary);
      margin-bottom: 0.5rem;
      font-weight: 700;
      font-family: 'Outfit', sans-serif;
    }

    .empty-state p {
      color: var(--color-text-secondary);
      font-size: 1.05rem;
      max-width: 440px;
      margin: 0 auto;
      line-height: 1.55;
    }

    @media (max-width: 768px) {
      .insights-container {
        padding: 1.5rem 1rem;
      }

      .gradient-text {
        font-size: 2.25rem;
      }

      .insights-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StreaksComponent implements OnInit {
  insights: any[] = [];
  loading = true;

  constructor(private storageService: StorageService) {}

  async ngOnInit(): Promise<void> {
    await this.generateInsights();
  }

  private async generateInsights(): Promise<void> {
    this.loading = true;
    
    try {
      const entries = await this.storageService.getAllEntries();
      
      if (entries.length === 0) {
        this.insights = [];
        this.loading = false;
        return;
      }

      // Sort entries by date
      const sortedEntries = entries.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      const latestEntry = sortedEntries[0];
      const oldestEntry = sortedEntries[sortedEntries.length - 1];
      
      // Calculate weight change
      const weightChange = latestEntry.weightKg - oldestEntry.weightKg;
      const daysTracking = Math.floor(
        (new Date(latestEntry.date).getTime() - new Date(oldestEntry.date).getTime()) / (1000 * 60 * 60 * 24)
      );

      // Generate insights
      this.insights = [];

      // Progress Insight
      if (weightChange < 0) {
        this.insights.push({
          icon: this.getSvgIcon('progress'),
          title: 'Great Progress!',
          message: `You've lost ${Math.abs(weightChange).toFixed(1)} kg in ${daysTracking} days. Keep up the excellent work!`,
          action: 'Continue tracking'
        });
      } else if (weightChange > 0) {
        this.insights.push({
          icon: this.getSvgIcon('warning'),
          title: 'Weight Increase Detected',
          message: `Your weight has increased by ${weightChange.toFixed(1)} kg. Consider reviewing your diet and exercise routine.`,
          action: 'Review plan'
        });
      } else {
        this.insights.push({
          icon: this.getSvgIcon('stable'),
          title: 'Weight Stable',
          message: `Your weight has remained stable at ${latestEntry.weightKg} kg. Great for maintenance!`,
          action: 'Keep it up'
        });
      }

      // Consistency Insight
      if (entries.length >= 7) {
        this.insights.push({
          icon: this.getSvgIcon('consistency'),
          title: 'Consistent Tracking',
          message: `You have ${entries.length} weight entries logged. Consistency is key to success!`,
          action: 'View trends'
        });
      }

      // Recommendation Insight
      if (weightChange < 0 && daysTracking > 0) {
        const avgWeeklyLoss = (Math.abs(weightChange) / daysTracking) * 7;
        if (avgWeeklyLoss > 1) {
          this.insights.push({
            icon: this.getSvgIcon('recommendation'),
            title: 'Slow Down',
            message: `You're losing ${avgWeeklyLoss.toFixed(1)} kg/week. Aim for 0.5-1 kg/week for sustainable results.`,
            action: 'Adjust plan'
          });
        } else {
          this.insights.push({
            icon: this.getSvgIcon('recommendation'),
            title: 'Perfect Pace',
            message: `You're losing ${avgWeeklyLoss.toFixed(1)} kg/week. This is a healthy and sustainable rate!`,
            action: 'Keep going'
          });
        }
      }

      this.loading = false;
    } catch (error) {
      console.error('Error generating insights:', error);
      this.loading = false;
    }
  }

  private getSvgIcon(type: string): string {
    const icons: { [key: string]: string } = {
      progress: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
        </linearGradient></defs>
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="url(#progressGradient)"/>
      </svg>`,
      warning: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
        </linearGradient></defs>
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="url(#warningGradient)"/>
      </svg>`,
      stable: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="stableGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
        </linearGradient></defs>
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" fill="url(#stableGradient)"/>
      </svg>`,
      consistency: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="consistencyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
        </linearGradient></defs>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#consistencyGradient)"/>
      </svg>`,
      recommendation: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="recommendationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#db2777;stop-opacity:1" />
        </linearGradient></defs>
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" fill="url(#recommendationGradient)"/>
      </svg>`
    };
    return icons[type] || icons['recommendation'];
  }
}

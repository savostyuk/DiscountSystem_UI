import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { IBackground, SelectBackgroundService } from '../../../services/select-background-service/select-background.service';

@Component({
  selector: 'app-select-background',
  standalone: true,
  imports: [MatMenuModule, MatMenuTrigger, CommonModule],
  templateUrl: './select-background.component.html',
  styleUrls: ['./select-background.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectBackgroundComponent implements OnInit {
  backgrounds: IBackground[];
  activeBackground: IBackground;

  constructor(private selectBackgroundService: SelectBackgroundService) {
    this.backgrounds = selectBackgroundService.getBackgrounds();
    this.activeBackground = { background: '', colorClass: '' };
  }

  ngOnInit(): void {
    this.activeBackground = JSON.parse(localStorage.getItem('background') as string) || this.backgrounds[0];
    document.body.style.background = (this.activeBackground?.background as string);
    this.changeColorTheme(this.activeBackground);
  }

  changeBackground(background: IBackground): void {
    this.activeBackground = background;
    localStorage.setItem('background', JSON.stringify(this.activeBackground));
    document.body.style.background = background.background;
    this.changeColorTheme(background);
  }

  changeColorTheme(background: IBackground): void {
    if (background.colorClass) {
      document.body.className = 'mat-typography';
      document.body.classList.add(background.colorClass);
    }
  }
}

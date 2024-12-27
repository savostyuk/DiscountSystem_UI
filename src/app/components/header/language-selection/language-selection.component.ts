import { Component, ViewEncapsulation, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILanguage } from '../../../models/language.interface';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-language-selection',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './language-selection.component.html',
  styleUrl: './language-selection.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LanguageSelectionComponent {
  private readonly translate = inject(TranslateService);

  currentLang = '';
  imagePath = '';

  languages: ILanguage[] = [
    {lang: 'English', path: 'images/header/header_menu_uk.svg', langId: 0, langCode: 'en'},
    {lang: 'Русский', path: 'images/header/header_menu_ru.svg', langId: 1, langCode: 'ru'}
  ];

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');

    this.languages.forEach((language) => {
      this.imagePath = (language.langCode === lang) 
          ? this.imagePath = language.path 
          : 'images/header/header_menu_uk.svg';
    });

    this.translate.setDefaultLang(lang || 'en');
  }

  selectLang(path: string, langCode: string): void {
    this.translate.use(langCode);
    this.imagePath = path;
    this.currentLang = langCode;
    
    localStorage.setItem('lang', langCode);
  }
}

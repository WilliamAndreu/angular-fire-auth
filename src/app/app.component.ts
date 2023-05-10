import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LoadingStateService } from './providers/utils/loading-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  loading$: Observable<boolean> | undefined;

  constructor(
    private translate:TranslateService,
    private loadingState:LoadingStateService
    ){}

  ngOnInit() {
    this.loading$ = this.loadingState.loading$;
    const languages = ['es','en'];
    this.translate.addLangs(languages);
    languages.forEach(lan=>this.translate.use(lan));
  }

}

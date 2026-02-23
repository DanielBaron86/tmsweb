import {inject, Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom, timeout} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  readonly http = inject(HttpClient);

  private readonly DEFAULT_CONFIG = {
    apiUrl: 'https://localhost:7220/api',
    apStr: 'Default App String'
  };

  private config: any = this.DEFAULT_CONFIG;

  async loadConfig() {
    if (isDevMode()) {
      this.config = this.DEFAULT_CONFIG;
      return;
    }

    try {
      this.config = await lastValueFrom(
        this.http.get('/assets/config.json').pipe(timeout(2000))
      );
    } catch (err) {
      console.error('Could not load config, falling back to defaults', err);
      this.config = this.DEFAULT_CONFIG;
    }
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

}

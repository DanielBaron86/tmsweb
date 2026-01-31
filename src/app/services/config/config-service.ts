import {inject, Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom, timeout} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  readonly http = inject(HttpClient);
  private config: any;
  private readonly DEFAULT_CONFIG = {
    apiUrl: 'https://tmsapi.danielsplaygrounds.com/api',
    apStr: 'Default App String'
  };

  async loadConfig() {
    if (isDevMode()) {
      this.config = this.DEFAULT_CONFIG;
    }else{
      try {
        this.config = await lastValueFrom(this.http.get('/assets/config.json').pipe( timeout(5000) ) );
      } catch (err) {
        this.config = this.DEFAULT_CONFIG;
        console.error('Could not load config, falling back to defaults', err);
      }
    }


  }

  get apiUrl() {
    return  this.config.apiUrl;
  }


}

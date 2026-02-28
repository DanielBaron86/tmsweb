import { Injectable, signal } from '@angular/core';
export interface ToastData {
  title: string;
  status: number;
  detail: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastState = signal<ToastData | null>(null);
  clear() {
    this.toastState.set(null);
  }

  show(data: ToastData) {
    this.toastState.set(data);
    setTimeout(() => this.clear(), 5000);
  }
}

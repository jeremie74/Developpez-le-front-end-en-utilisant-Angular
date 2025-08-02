import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  template: `
    <ngx-spinner bdColor="rgba(0,0,0,0.5)" size="medium" color="#fff" type="ball-spin-clockwise">
    </ngx-spinner>
  `,
})
export class LoaderComponent {
  loaderService = inject(LoaderService);
  spinner = inject(NgxSpinnerService);

  constructor() {
    effect(() => {
      if (this.loaderService.loading()) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}

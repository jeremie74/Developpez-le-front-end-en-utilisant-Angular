import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from './core/utils/loader.component';
import { OlympicService } from './core/services/olympic.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, LoaderComponent],
})
export class AppComponent {
  constructor(private olympicService: OlympicService) {}
}

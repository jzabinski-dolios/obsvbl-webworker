import { Component } from '@angular/core';
import { fromWorker } from 'observable-webworker';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'obsvbl-webworker';

  runWorker() {
    const input$: Observable<string> = of('hello');

    fromWorker<string, string>(
      () => new Worker(new URL('./app.worker', import.meta.url), { type: 'module' }),
      input$
    ).subscribe((message) => {
      console.log(`Got message`, message);
    });
  }
}

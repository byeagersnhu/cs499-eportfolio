import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

function loadGoogleMaps(apiKey: string) {
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  script.async = true;
  document.head.appendChild(script);
}

loadGoogleMaps(environment.googleMapsApiKey)

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

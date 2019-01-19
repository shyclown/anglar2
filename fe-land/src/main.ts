import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/* Editor */

import EditorArea from './app/editor/EditorArea';

const editor = new EditorArea({ input_id: 'inputTest', form_id: 'formTest'});

console.log(editor);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

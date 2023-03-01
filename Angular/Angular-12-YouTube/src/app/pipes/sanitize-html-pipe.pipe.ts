import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtmlPipe'
})
export class SanitizeHtmlPipePipe implements PipeTransform {

  constructor(private __sanitizer: DomSanitizer) { }
  
  transform(value: string, ...args: unknown[]): SafeHtml {
    return this.__sanitizer.bypassSecurityTrustHtml(value);
  }

}

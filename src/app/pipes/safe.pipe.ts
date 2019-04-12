import { Pipe, Sanitizer, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safe'})
export class SafeHtml implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {}
    transform(value) {      
      return this.sanitized.bypassSecurityTrustHtml(value);
    }
}
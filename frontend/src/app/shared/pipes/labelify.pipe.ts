import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelify', // or use any name from above
  standalone: true
})
export class LabelifyPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    return value
      .replace(/([A-Z])/g, ' $1')       // camelCase → spaced
      .replace(/_/g, ' ')               // underscores → spaces
      .replace(/\s+/g, ' ')             // collapse multiple spaces
      .trim()
      .replace(/\b\w/g, c => c.toUpperCase()); // capitalize each word
  }
}

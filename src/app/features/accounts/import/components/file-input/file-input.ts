import { Component, input, output } from '@angular/core';

export type FileInputEvent = Event & { target: HTMLInputElement };

@Component({
  selector: 'app-file-input',
  imports: [],
  templateUrl: './file-input.html',
  styleUrl: './file-input.css',
})
export class FileInput {
  legend = input('');
  label = input('');
  accept = input('text/plain');
  file = output<File>();

  protected onChange($event: Event) {
    const target = $event?.target as HTMLInputElement;
    if (!target?.files || target.files.length > 1 || target.files.length === 0) {
      throw new Error('this component expects only one file to be selected');
    }
    const file = target.files?.item(0);
    if (!file) {
      throw new Error('file was unexpectedly null');
    } else {
      this.file.emit(file);
    }
  }
}

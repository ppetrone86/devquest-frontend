import { Component, inject } from '@angular/core';
import { AbstractFieldComponent } from '@components/shared/forms/fields/abstract-field/abstract-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { FieldWrapperComponent } from '../field-wrapper/field-wrapper.component';

@Component({
  selector: 'app-file-input',
  imports: [FileUpload, TranslateModule, FieldWrapperComponent],
  providers: [MessageService],
  templateUrl: './file-input.component.html',
  standalone: true,
})
export class FileInputComponent extends AbstractFieldComponent {
  private _messageService: MessageService = inject(MessageService);
  uploadedFiles: any[] = [];

  onUpload(event: FileUploadEvent) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
      // TODO: handle with form logic
    }

    this._messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
}

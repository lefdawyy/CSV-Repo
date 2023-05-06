import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FilesService, MyFile} from "../../files.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
  selectedFile!: File;
  @Output() fileUploaded = new EventEmitter();

  constructor(private snackBar: MatSnackBar, private readonly _fileService: FilesService) {
  }

  ngOnInit() {
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
      this._fileService.uploadFile(this.selectedFile);
      this.fileUploaded.emit();
  };

};

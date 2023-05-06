import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FilesService} from "../../files.service";
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
  selectedFile!: File;
  @Output() fileUploaded = new EventEmitter();
  hasUploadPermission:boolean = false;
  constructor(private snackBar: MatSnackBar, private readonly _fileService: FilesService) {
  }

  ngOnInit() {
    this.checkUserPermissions();
  }

  checkUserPermissions(): void {
    Auth.currentAuthenticatedUser().then(user => {
      const userGroups = user.signInUserSession.accessToken.payload['cognito:groups'];
      this.hasUploadPermission = userGroups.includes('full-permission') || userGroups.includes('read-write-permission');
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
      this._fileService.uploadFile(this.selectedFile);
      this.fileUploaded.emit();
  };

};

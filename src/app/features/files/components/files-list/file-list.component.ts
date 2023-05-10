import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FilesService, MyFile} from "../../files.service";
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-files-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})

export class FileListComponent implements OnInit, OnChanges {
  files: MyFile[] = [];
  @Output() uploadedFiles = new EventEmitter<MyFile[]>();
  @Input() isUploaded: boolean = false;
  displayedColumns: string[] = ['name', 'size', 'actions'];
  isLoading:boolean = false;
  hasDeletePermission:boolean = false;

  constructor(private fileService: FilesService, private snackBar: MatSnackBar) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.checkUserPermissions();
    this.getFiles();
  }

  checkUserPermissions(): void {
    Auth.currentAuthenticatedUser().then(user => {
      const userGroups = user.signInUserSession.accessToken.payload['cognito:groups'];
      this.hasDeletePermission = userGroups.includes('full-permission');
    });
  }

  getFiles(): void {
    this.isLoading = true;
    this.fileService.getFiles().subscribe({
      next: fileList => this.files = fileList,
      error: error => console.error(error),
      complete: () => this.isLoading = false
    });
  }

  downloadFile(file: MyFile): void {
    this.isLoading = true;
    this.fileService.downloadFile(file.name).subscribe({
        next: data => {
          const link = document.createElement('a');
          link.href = data.downloadUrl;
          link.download = file.name;
          link.click();
          this.snackBar.open('File downloaded successfully', 'Close', { duration: 2000 });
        },
        error: error => {
          console.error(error);
          this.snackBar.open('Error while downloaded file', 'Close', { duration: 2000 });
        },
        complete: () => this.isLoading = false
      });
  }

  deleteFile(file: MyFile): void {
    this.isLoading = true;
    this.fileService.deleteFile(file.name).subscribe(
      {
        next: () => {
          this.snackBar.open('File deleted successfully', 'Close', { duration: 2000 });
          setTimeout(function() {}, 3000);
          this.getFiles();
        },
        error: error => {
          console.error(error);
          this.snackBar.open('Error while deleted file', 'Close', { duration: 2000 });
        },
        complete: () => this.isLoading = false
      }
    );
  }

  convertToJson(file: MyFile): void {
    this.isLoading = true;
    this.fileService.convertToJson(file.name).subscribe({
      next: response => {
        const blob = new Blob([JSON.stringify(response)], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, file.name + '.json');
        this.snackBar.open('Json file downloaded successfully', 'Close', { duration: 2000 });
        this.getFiles();
      },
      error: error => {
        console.error(error);
        this.snackBar.open('Error while downloaded json file', 'Close', { duration: 2000 });
      },
      complete: () => this.isLoading = false
    });
  }
}
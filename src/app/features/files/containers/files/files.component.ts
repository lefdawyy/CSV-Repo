import {Component} from '@angular/core';
import {FilesService, MyFile} from "../../files.service";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent {
  isLoading: boolean = false;
  isUploaded: boolean = false;
  files: MyFile[] = [];

  constructor() {
  }

  onFileUploaded(): void {
    this.isUploaded = true;
  }
}

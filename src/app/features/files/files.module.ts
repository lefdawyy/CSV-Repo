import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../shared/material/material.module";
import {FileListComponent} from "./components/files-list/file-list.component";
import {FileUploadComponent} from "./components/file-upload/file-upload.component";
import {FileRoutingModule} from "./files.routing";
import {HttpClientModule} from "@angular/common/http";
import {FilesService} from "./files.service";
import {FilesComponent} from './containers/files/files.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FileListComponent,
    FileUploadComponent,
    FilesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FileRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FilesService, FileListComponent],
})
export class FilesModule {
}

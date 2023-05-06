import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.prod';

export interface MyFile {
  name: string;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private http: HttpClient,private snackBar: MatSnackBar) {
  }

  uploadFile(file: File) {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = () => {
      return this.http.post<MyFile>(`${environment.apiBaseUrl}/upload?fileName=${file.name}`, fileReader.result).subscribe({
        next: res => {
          console.log('File uploaded successfully:', res);
          this.snackBar.open('File uploaded successfully', 'Close', { duration: 2000 });
          setTimeout(() => {
            this.snackBar.open('There\'s some updates, please refresh the page', 'Close');
          }, 8000);
        },
        error: error => {
          console.log('Error while uploading file:', error);
          this.snackBar.open('Error while uploading file', 'Close', { duration: 2000 });
        }
      });
    }
  }

  deleteFile(fileName: string): Observable<MyFile> {
    return this.http.delete<MyFile>(`${environment.apiBaseUrl}/delete?fileName=${fileName}`);
  }

  getFiles(): Observable<MyFile[]> {
    return this.http.get<{ fileList: { name: string, size: number }[] }>(`${environment.apiBaseUrl}/list`).pipe(
      map(response => response.fileList.map(file => ({
        name: file.name,
        size: file.size
      })))
    );
  }

  downloadFile(fileName: string): Observable<{downloadUrl: string}> {
    return this.http.get<{downloadUrl: string}>(`${environment.apiBaseUrl}/download?fileName=${fileName}`);
  }

  convertToJson(fileId: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/json?fileName=${fileId}`);
  }
}
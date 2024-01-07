import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from '../item.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from '../item.model';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  
  
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  , private http:ItemService, private _snackBar: MatSnackBar) {}
  

 

  fecharModal(){
    this.dialogRef.close()
  }

  exibirMensagemTemporaria(mensagem: string): void {
    this._snackBar.open(mensagem, '', {
      duration: 1000,
    });
  }  

  editarDados(data: Item) {
      this.http.editDataForn(data).subscribe(
        (response) => {
          
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 400) {
              this.exibirMensagemTemporaria(error.error)
            } else {
              window.location.reload()
            }
          }
        }
      );
    }
}

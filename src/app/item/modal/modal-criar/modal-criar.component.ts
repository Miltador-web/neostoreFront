import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ItemService } from '../../item.service';
import { Item } from '../../item.model';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-modal-criar',
  templateUrl: './modal-criar.component.html',
  styleUrl: './modal-criar.component.css'
})
export class ModalCriarComponent {


  constructor(private http:ItemService, public dialogRef: MatDialogRef<ModalCriarComponent>,private _snackBar: MatSnackBar){}
  data = [{id: '', name: '' ,email: '', description: '', cnpj:''}];

  fecharModal(){
    this.dialogRef.close()
  }

  exibirMensagemTemporaria(mensagem: string): void {
    this._snackBar.open(mensagem, '', {
      duration: 1000, // Duração em milissegundos (2 segundos)
    });
  }

  cadastrarFornecedor(data: Item[]) {
    this.http.cadastrarDataForn(data).subscribe(
      (response) => {
       window.location.reload()
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            this.exibirMensagemTemporaria(error.error)
          }
        }
      }
    );
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from './item.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component'
import { ModalCriarComponent } from './modal/modal-criar/modal-criar.component';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  colunas: string[] = ['name', 'email', 'description', 'cnpj'];
  modalData:any

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private apiService: ItemService, private dialog: MatDialog) {}

  abrirModal(id?: string): void {
    if(id!= null){
      this.apiService.getDataUniqueForn(id).subscribe(data => {
        this.dialog.open(ModalComponent, {
          width: '400px',
          height: '450px',
          data: data, // Passar 'data' diretamente aqui
        });
      });
    }else{
      this.dialog.open(ModalCriarComponent, {
        width: '400px',
        height: '450px'
      });
    }
   
  }

  deleteFornecedor(id: string){
    this.apiService.deleteDataUniqueForn(id).subscribe()
    window.location.reload();
  }
  


  ngOnInit(): void {
    this.apiService.getData().subscribe((dadosApi: any[]) => {
      this.dataSource = new MatTableDataSource(dadosApi);
      this.dataSource.paginator = this.paginator;
    });
  }


  handlePageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;

    this.apiService.getData().subscribe((dadosApi: any[]) => {
      this.dataSource.data = dadosApi.slice(startIndex, endIndex);
    });
  }
}

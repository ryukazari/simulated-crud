import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User.model';
import { UserService } from 'src/services/user/user.service';
import { Post } from 'src/models/Post.model';
import { PostService } from 'src/services/post/post.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmationComponent } from '../../shared/modal-confirmation/modal-confirmation.component';
import { ModalEditarPostComponent } from './modal-editar-post/modal-editar-post.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.css']
})
export class InitPageComponent implements OnInit {
  public userslists: User[];
  public user: User = null;
  public displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'acciones'];
  public dataSource: MatTableDataSource<Post>;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(){
    this.userService.listarUsuarios().subscribe(
      (result: User[]) => {
        this.userslists =  result.slice();
      }
    )
  }

  cargarPost(){
    this.postService.listarPostPorUsuario(this.user.id).subscribe(
      (result: Post[]) => {
        this.dataSource = new MatTableDataSource(result);
      }
    )
  }

  seleccionarUsuario(){
    this.cargarPost();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarPost(idPost: number){
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      width: '250px',
      data: {
        tipo: 'preguntar', // preguntar, aceptar, cancelar
        titulo: `Eliminar Post`,
        texto: `¿Está seguro que desea eliminar este post?`
      }
    });
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result){
          this.spinner.show();
          this.postService.eliminarPost(idPost).subscribe(
            result => {
              this.spinner.hide();
              this.dialog.open(ModalConfirmationComponent, {
                width: '250px',
                data: {
                  tipo: 'aceptar', // preguntar, aceptar, cancelar
                  titulo: `El post fue eliminado`,
                  texto: `El post con id ${idPost} fue eliminado satisfactoriamente.`
                }
              });
            }
          )
        }
      }
    )
  }

  editarPost(post: Post){
    const dialogRef = this.dialog.open(ModalEditarPostComponent, {
      width: '500px',
      data: {
        post,
        editing: true
      }
    });
    dialogRef.afterClosed().subscribe(
      result=>{
        this.spinner.show();
        if(result.ok){
          this.spinner.hide();
            this.dialog.open(ModalConfirmationComponent, {
              width: '250px',
              data: {
                tipo: 'aceptar', // preguntar, aceptar, cancelar
                titulo: `El post fue editado`,
                texto: `El post con id ${result.id} fue editado satisfactoriamente.`
              }
            });
        }
      }
    )
  }

  agregarPost(){
    const post: Post = {
      id: 0,
      title: '',
      body: '',
      userId: this.user.id
    }
    const dialogRef = this.dialog.open(ModalEditarPostComponent, {
      width: '500px',
      data: {
        post,
        editing: false
      }
    });
    dialogRef.afterClosed().subscribe(
      result=>{
        this.spinner.show();
        if(result.ok){
          this.spinner.hide();
            this.dialog.open(ModalConfirmationComponent, {
              width: '250px',
              data: {
                tipo: 'aceptar', // preguntar, aceptar, cancelar
                titulo: `El post fue creado`,
                texto: `El post fue creado satisfactoriamente y su id es: ${result.id}.`
              }
            });
        }
      }
    )
  }
}

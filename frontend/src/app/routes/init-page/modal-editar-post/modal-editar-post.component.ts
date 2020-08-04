import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/models/Post.model';
import { PostService } from 'src/services/post/post.service';

interface Data {
  post: Post,
  editing: boolean
}

@Component({
  selector: 'app-modal-editar-post',
  templateUrl: './modal-editar-post.component.html',
  styleUrls: ['./modal-editar-post.component.css']
})
export class ModalEditarPostComponent implements OnInit {

  public postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private dialogRef: MatDialogRef<ModalEditarPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) { 
    dialogRef.disableClose = true;
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log(this.data.post);
    if(this.data.editing){
      this.postForm.setValue({
        title: this.data.post.title,
        description: this.data.post.body
      });
      console.log(this.postForm.value);
    }
  }

  cerrar(): void {
    this.dialogRef.close(false);
  }

  guardar(): void {
    const post: Post = {
      id: this.data.post.id,
      userId: this.data.post.userId,
      title: this.postForm.get('title').value,
      body: this.postForm.get('description').value,
    }
    this.data.editing ? this.editarPost(post) : this.agregarPost(post);
  }

  agregarPost(post: Post){
    console.log(post);
    this.postService.agregarPost(post).subscribe(
      (result: any) => {
        this.dialogRef.close({
          ok: true,
          id: result.id
        });
      }
    )

  }

  editarPost(post: Post){
    this.postService.editarPost(post).subscribe(
      (result: any) => {
        this.dialogRef.close({
          ok: true,
          id: result.id
        });
      }
    )
  }
}

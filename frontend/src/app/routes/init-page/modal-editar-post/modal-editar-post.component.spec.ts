import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarPostComponent } from './modal-editar-post.component';

describe('ModalEditarPostComponent', () => {
  let component: ModalEditarPostComponent;
  let fixture: ComponentFixture<ModalEditarPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

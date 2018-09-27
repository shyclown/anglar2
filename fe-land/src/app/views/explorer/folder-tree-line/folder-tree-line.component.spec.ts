import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderTreeLineComponent } from './folder-tree-line.component';

describe('FolderTreeLineComponent', () => {
  let component: FolderTreeLineComponent;
  let fixture: ComponentFixture<FolderTreeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderTreeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderTreeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

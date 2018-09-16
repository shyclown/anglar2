import { Component, OnInit, Input } from '@angular/core';
import { ExplorerService } from "../service/explorer.service";

@Component({
  selector: 'app-folder-tree-line',
  templateUrl: './folder-tree-line.component.html',
  styleUrls: ['./folder-tree-line.component.scss'],
})

export class FolderTreeLineComponent implements OnInit {

  isOpen : boolean;
  currentState : any;
  data: ExplorerService;

  @Input() folder : any;


  constructor( private ExplorerService: ExplorerService ){
      this.data = ExplorerService;
      this.data.explorerState.subscribe( data => { this.currentState = data } );
  }

  ngOnInit( ) {
      this.isOpen = false;
      if(!this.folder){ this.folder = { id: 0 } }
  }

  getCurrentFolders(){
      if(this.data.folders.value){
          let parent = this.folder.id == 0 ?  null : this.folder.id;
            return this.data.folders.value.folders.filter( item => {
            return item.parent_folder_id == parent
      }
      );

      }
  }

  openFolder(folder: any)
  {
    event.stopPropagation();
    event.preventDefault();

    if(!folder.isOpen){ folder.isOpen = false; }
    folder.isOpen = !folder.isOpen;

    // Open folder in folder content even when we closing content
      if (this.currentState.currentFolderID !== folder.id)
      {
          this.currentState.currentFolderID = folder.id;
          this.data.setCurrentData(this.currentState);
      }
  }

  isOpenFolder(folder: any){
      if(!folder.isOpen){ return false; }
      else{ return folder.isOpen; }
  }

  doubleClick(){
    /* show content in folderContent window */
  }
}

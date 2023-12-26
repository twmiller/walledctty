import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FileService } from '../file.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  boardName: string = "";
  boardMessages: any = [];
  active_board: any;
  active_message: any;
  board_names: any = [
    { name: "System News, Information, and Issues", board: "system" },
    { name: "Through the Past, Darkly", board: "past" },
    { name: "The Future is Now", board: "present" }
  ];
  active = 1;

  constructor(private fileService: FileService, private route: ActivatedRoute, private router: Router, private scroller: ViewportScroller) { 
  }
  ngOnInit() {
    this.boardMessages = [];
    this.active_board = 'system';
    this.active_message = '';
    this.route.queryParams.subscribe((params: Params) => {
      this.route.params.subscribe(params => {
        this.active_board = params['board'];
        if (this.active_board == "system") {
          this.active = 1;
          this.boardName = "System News, Information, and Issues";
        } else if (this.active_board == "past") { 
          this.active = 2;
          this.boardName = "Through the Past, Darkly";
        } else if (this.active_board == "present") {
          this.active = 3;
          this.boardName = "The Future is Now";
        }
        if (this.active_board) {
          this.fileService.getMessageBoard(this.active_board.toUpperCase().trim()).then((data) => {
            this.boardMessages = data;
            if (this.boardMessages.length > 0) {
              this.boardMessages = data.reverse();
              this.route.fragment.pipe(map(fragment => fragment || '')).subscribe(fragment => {
                if (fragment) {
                  this.active_message = fragment.replace('message_', '');
                  setTimeout(() => 
                  {
                    console.log('scrolling...')
                    this.scroller.scrollToAnchor(fragment);
                  },
                  1500);
                  
                }
              });
            }
          });        
        }
      });
    });
  }

  ngAfterViewChecked(){
    this.scroller.scrollToAnchor('message_' + this.active_message);
  }

  load_route(board: string) {
    this.router.navigate(['/messages/' + board]);
  }
}
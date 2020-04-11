import { Component, OnInit } from '@angular/core';
import { MainPageServiceService } from '../services/main-page-service.service';

@Component({
  selector: 'app-main-page-component',
  templateUrl: './main-page-component.component.html',
  styleUrls: ['./main-page-component.component.css']
})
export class MainPageComponentComponent implements OnInit {
  constructor(private mainPageServices: MainPageServiceService) {}

  ngOnInit(): void {
    this.getAllMessages();
  }

  messegeObject;
  messegeContent;
  theNewValueOfSplitedMessges;
  keysAndValues;

  allMessages = [];
  postiveMessages = [];
  nigatevMessages = [];
  naturalMessages = [];
  displayedMessages;

  getAllMessages() {
    this.mainPageServices.getAllMessageObject().subscribe((data : any) => {
      this.messegeObject = data.feed.entry;
      this.messegeObject.forEach(element => {
        this.messegeContent = element.content.$t;
        this.theNewValueOfSplitedMessges = this.messegeContent.split(',');
        let obj = {};
        this.theNewValueOfSplitedMessges.forEach(element => {
          this.keysAndValues = element.split(':');
          //Check if the value is not undifind remove the space and if undifind make the value empty string
          if (this.keysAndValues[1] !== undefined) {
            obj[this.keysAndValues[0].trim()] = this.keysAndValues[1].trim();
          } else {
            obj[this.keysAndValues[0].trim()] = '';
          }
        });
        this.allMessages.push(obj);
      });
      this.splitCategories();
    })
  }

  // Looping into the objects and push every one for where he went
  splitCategories() {
    this.allMessages.forEach(element => {
      if (element.sentiment === 'Positive') {
        this.postiveMessages.push(element);
      } else if (element.sentiment === 'Negative') {
        this.nigatevMessages.push(element);
      } else if (element.sentiment === 'Neutral') {
        this.naturalMessages.push(element);
      }
    });
    console.log(
      'post',
      this.postiveMessages,
      'nigate',
      this.nigatevMessages,
      'natural',
      this.naturalMessages,
      'all',
      this.allMessages
    );
  }

  changeTheDisplayedDataMessagesgory(input) {
    if (input == 'All') {
      this.displayedMessages = this.allMessages;
    } else if (input == 'Post') {
      this.displayedMessages = this.postiveMessages;
    } else if (input == 'Nig') {
      this.displayedMessages = this.nigatevMessages;
    } else if (input == 'Nat') {
      this.displayedMessages = this.naturalMessages;
    }
  }

}

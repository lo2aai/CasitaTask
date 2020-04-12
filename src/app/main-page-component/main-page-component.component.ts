import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MainPageServiceService } from '../services/main-page-service.service';



declare var google;

@Component({
  selector: 'app-main-page-component',
  templateUrl: './main-page-component.component.html',
  styleUrls: ['./main-page-component.component.css']
})
export class MainPageComponentComponent implements OnInit {
  
  @ViewChild('map') mapElement: ElementRef;
  latitude: number = 30.0837485;
  longitude: number = 31.3422724;
  marker;
  mapStyle = [
    {
      featureType: 'all',
      elementType: 'geometry.fill',
      stylers: [
        {
          weight: '2.00'
        }
      ]
    },
    {
      featureType: 'all',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#9c9c9c'
        }
      ]
    },
    {
      featureType: 'all',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          color: '#f2f2f2'
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: -100
        },
        {
          lightness: 45
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#eeeeee'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#7b7b7b'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#46bcec'
        },
        {
          visibility: 'on'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#c8d7d4'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#070707'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    }
  ];
  map: any;
  constructor(
    private mainPageServices: MainPageServiceService
  ) // public geolocation: Geolocation
  {}

  ngOnInit(): void {
    this.getAllMessages();

    ////////////////
    var myOptions = {
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.mapStyle
    };

    // Intialize to map
    this.map = new google.maps.Map(document.getElementById('map'), myOptions);

    //Center of map
    var address = 'cairo';
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address: address
      },
      (results, status) => {
        this.map.setCenter(results[0].geometry.location);
      }
    );
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

  // Istead All Of That I Tried JSON.Parse But The Object Dosent Has The Right Strucre Of Json 
  getAllMessages() {
    this.mainPageServices.getAllMessageObject().subscribe((data: any) => {
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
    });
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

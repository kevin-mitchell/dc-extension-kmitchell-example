import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import { lazyInject } from '../../di/services.container';
import { Component } from 'preact';
import StorageService from '../../data/storage.service';
import { ContentFieldExtension } from 'dc-extensions-sdk/dist/types/lib/extensions/content-field/ContentFieldExtension';
import { ReplaySubject } from 'rxjs';

import { ClientConnection, ServerConnection } from 'message-event-channel';


import style from './style.css';
import Iframe from '../../test/amplience/iframe';

export default class AmplienceTestHarness extends Component<any, any> {

    @lazyInject('StorageService') storageService?: StorageService;

    iFrame?: any;
    testContext: any = {
        category: "CONTENT_FIELD",
        contentItemId: "5f1128b3-495e-4576-9508-1c00c172d3d7",
        fieldSchema: {title: "dc-extension-kmitchell-example", description: "dc-extension-kmitchell-example", type: "number", "ui:extension": {}, minimum: 0 },
        hubId: "5f15c3b2cff47e0001b8752a",
        locales: {
          default: "en-us", 
          available: [
            {
              country: "US",
              index: 0,
              language: "en",
              locale: "en-US",
              selected: true
            }
          ]
        },
        locationHref: "https://content.amplience.net/#!/bounteous/authoring/content-item/edit/5f1128b3-495e-4576-9508-1c00c172d3d7",
        params: {
        installation: {
        max: 42,
        min: 2,
        value: 19,
        } ,
        instance: {
        max: 20,
        min: 0,
        value: 6,
    },
    },
        readOnly: false,
        stagingEnvironment: "1r6l3yo33ah2z1wsan4sdyeb6g.staging.bigcontent.io",
        visualisation: "1r6l3yo33ah2z1wsan4sdyeb6g.staging.bigcontent.io"
  };
    

    constructor() {
 
      super();
      this.state = {
        fieldHistory: [null]
      };
    }

    fieldSet = (value: string) => { 
      let history = this.state.fieldHistory;
      console.log("history before", history);
      history.push(value);     
      console.log("history after", history);
      this.setState({
        fieldHistory: history
      });
    }

    getHistory = () => {
      console.log(this.state.fieldHistory);
      return JSON.stringify(this.state);
    }
  
    componentWillMount() {  

      this.iFrame = <Iframe 
        src="/kevin-one-example?mc-name=286d3e31-71aa-4dc5-9511-9008372d3bc8" 
        testContext={this.testContext}
        fieldSetFunction={this.fieldSet}
        ></Iframe>;      
      
    }
  
    render({ value, optionalValue }: any, { useOptional }: any) {
      return (
        <div>
          {this.iFrame}
          <div class="fieldValues">
            Values:
            {this.getHistory()}
          </div>
        </div>
      );
    }
  
  }


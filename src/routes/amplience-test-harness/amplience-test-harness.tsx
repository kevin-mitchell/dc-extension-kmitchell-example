import { createRef, FunctionalComponent, h } from 'preact';
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

    textAreaReference = createRef();

    iFrame?: any;
    testContext: any = {"category":"CONTENT_FIELD","contentItemId":"5f1128b3-495e-4576-9508-1c00c172d3d7","fieldSchema":{"title":"dc-extension-kmitchell-example","description":"dc-extension-kmitchell-example","type":"number","ui:extension":{},"minimum":0},"hubId":"5f15c3b2cff47e0001b8752a","locales":{"default":"en-us","available":[{"country":"US","index":0,"language":"en","locale":"en-US","selected":true}]},"locationHref":"https://content.amplience.net/#!/bounteous/authoring/content-item/edit/5f1128b3-495e-4576-9508-1c00c172d3d7","params":{"installation":{"max":42,"min":2,"value":19},"instance":{"max":20,"min":0,"value":6}},"readOnly":false,"stagingEnvironment":"1r6l3yo33ah2z1wsan4sdyeb6g.staging.bigcontent.io","visualisation":"1r6l3yo33ah2z1wsan4sdyeb6g.staging.bigcontent.io"};
    
    constructor() {      
      super();
      this.reload = this.reload.bind(this);
      this.updateTestContext = this.updateTestContext.bind(this);
      this.state = {
        mcName: 'abcdef',
        fieldSetValueHistory: [""],
        fieldGetValueHistory: [""],
        testContext: JSON.stringify(this.testContext)
      };
    }

    fieldSet = (value: string) => { 
      let history = this.state.fieldSetValueHistory;      
      history.push(value);     
      this.setState({
        fieldSetValueHistory: history
      });
    }

    getFieldSetHistory = () => {
      // console.log("getHistory", this.state.fieldSetValueHistory);
      return JSON.stringify(this.state.fieldSetValueHistory);
    }
  
    getFieldGetHistory = () => {
      // console.log("getHistory", this.state.fieldGetValueHistory);
      return JSON.stringify(this.state.fieldGetValueHistory);
    }
  
    componentWillMount() {       
      this.iFrame = <Iframe 
        src="/kevin-one-example?mc-name=initial-mc-name-value" 
        testContext={this.testContext}
        fieldSetFunction={this.fieldSet}
        ></Iframe>;      
      
    }

    updateTestContext(value: string) {
      console.log(value);
    } 

    reload() {     
      let testContext = this.textAreaReference.current.value;
      this.setState({
        mcName: Math.random().toString(36).substring(7),
        fieldSetValueHistory: [""],
        fieldGetValueHistory: [""],
        testContext: testContext
      });  
      
      this.iFrame = <Iframe 
        src={this.state.mcName} 
        testContext={JSON.parse(testContext)}
        fieldSetFunction={this.fieldSet}
        ></Iframe>;   
    }

    render() {
      return (
        <div>
          {this.iFrame}
          <button onClick={this.reload}>reload</button>
          <div class="fieldValues">
            Historical Field Set Values:
            {this.getFieldSetHistory()}
          </div>
          <div class="fieldValues">
            Historical Field Get Values:
            {this.getFieldGetHistory()}
          </div>
          <div>mc-name: {this.state.mcName}</div>
          <textarea value={this.state.testContext} ref={this.textAreaReference}></textarea>
        </div>
      );
    }
  
  }


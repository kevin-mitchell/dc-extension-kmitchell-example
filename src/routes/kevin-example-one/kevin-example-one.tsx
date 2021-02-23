import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import { lazyInject } from '../../di/services.container';
import { Component } from 'preact';
import StorageService from '../../data/storage.service';
import { ContentFieldExtension } from 'dc-extensions-sdk/dist/types/lib/extensions/content-field/ContentFieldExtension';
import { ReplaySubject } from 'rxjs';

import style from './style.css';

export default class KevinExampleOne extends Component<any, any> {

    @lazyInject('StorageService') storageService?: StorageService;
  
      // @lazyInject('AmplienceSDKProvider') amplienceSDKProvider?: Promise<any>;    
    @lazyInject('AmplienceSDK$') amplienceSDKReplaySubject?: ReplaySubject<ContentFieldExtension<any,any>>;
  
    constructor() {
      super();
      this.state = {
        useOptional: false,
        params: ""
      };
    }
  
    componentWillMount() {
        if (this.storageService) {
        }
        
        if (this.amplienceSDKReplaySubject) {
          console.log("truthy [amplienceSDKReplaySubject]");
          this.amplienceSDKReplaySubject.subscribe(extension => {      
            this.setState({params: JSON.stringify(extension.params)});                  
            console.log("next on ReplaySubject<ContentFieldExtension<any,any>>");
            extension.field.setValue(15).then(field => {            
              console.log("field value setValue(15) called with result", field);
            });
            extension.field.getValue();
          });
        }
    }
  
    render({ value, optionalValue }: any, { useOptional }: any) {
      return (
        <div id="output">{this.state.params}</div>
      );
    }
  
  }


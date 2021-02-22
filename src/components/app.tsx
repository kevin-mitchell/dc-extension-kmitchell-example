import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import { lazyInject } from '../di/services.container';
import { Component } from 'preact';
import StorageService from '../data/storage.service';
import { ContentFieldExtension } from 'dc-extensions-sdk/dist/types/lib/extensions/content-field/ContentFieldExtension';

export interface Props {
  value: string,
  optionalValue?: string
}

export interface State {
  useOptional: boolean,
  params: string
}

export default class App extends Component<Props, State> {

    @lazyInject('StorageService') storageService?: StorageService;

    @lazyInject('AmplienceSDKProvider') amplienceSDKProvider?: Promise<any>;
    @lazyInject('AmplienceSDK') amplienceSDK?: Promise<ContentFieldExtension<any,any>>;

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
      if (this.amplienceSDK) {
        console.log("amplience SDK promise has been injected though", "@lazyInject('AmplienceSDK') amplienceSDK?: Promise<any>;");
        try {          
          this.amplienceSDK.then((sdk) => {
            console.log("params", sdk.params);
            this.setState({params: JSON.stringify(sdk.params)});
            console.log("amplience SDK has been initialized through injected promise.");
            console.log("random field value example", sdk.field.getValue().then((result: any) => console.log(result)));
          }).catch(error => console.log(error));
        } catch(exception) {
          console.log(exception);
        }
                
      }
  }

  render({ value, optionalValue }: Props, { useOptional }: State) {
    return (
      <div id="output">{this.state.params}</div>
    );
  }

}
import { ServerConnection } from 'message-event-channel';
import { FunctionalComponent, Component, h } from 'preact';
import { CustomHistory, Route, Router } from 'preact-router';
import { useEffect } from 'preact/hooks';


export default class Iframe extends Component<any, any> {

    constructor(props: any) {
        console.log("afddsafsd", props);
      super();
      this.state = {
        useOptional: false,
        params: ""
      };
    }

    // setSrc(src: string) {
    //     // this.setState({
    //     //     src: src
    //     // })
    // }
  
    componentWillMount() {        
    }
  
    render({ value, optionalValue }: any, { useOptional }: any) {

        useEffect(() => {

            const connection = new ServerConnection(document.getElementById("iframe") as any);
            
            connection.on("mc-handshake", (data: any) => {
                console.log(data);
            });
      
            connection.on("field-model-set", (data: any) => {
                this.props.fieldSetFunction(data);
            });
                  
            connection.on("field-model-get", (payload: any, resolve: Function) =>   {                         
                return resolve("123");  
            });

            connection.on("context-get", (payload: any, resolve: Function) =>   {                             
                return resolve(this.props.testContext);  
            });            
            
          }, []) 
        

      return (
        <div>          
            <iframe id="iframe" src={this.props.src}/>         
        </div>
      );
    }
  
  }

export default class WindowStub {

    constructor() {
        
    }

    get location(): string {
        let url = new URL("http://fake.com");
        
        url.searchParams.append('mc-name', "ok");

        return url.toString();
    }

    get parent(): any {
        return {
            postMessage: (message: string) => {
                console.log(message);
            }
        }
    }

    public addEventListener(event: string, callback: any) : void {
        console.log(event);
        // console.log(callback);
    }
    
}
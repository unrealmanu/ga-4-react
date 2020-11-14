import {
  ga4Config,
  GA4ReactInterface,
  GA4ReactResolveInterface,
  gtagFunction,
} from './gtagModels';

declare global {
  interface Window {
    gtag: gtagFunction | Function;
  }
}

/**
 * @desc class required to manage google analitycs 4
 * @class GA4React
 *  */
export class GA4React implements GA4ReactInterface {
  constructor(
    private gaCode: string,
    private config?: ga4Config | object,
    private additionalGaCode?: Array<string>
  ) {
    this.config = config || {};
    this.gaCode = gaCode;
  }

  /**
   * @desc Return main function for send ga4 events, pageview etc
   * @returns {Promise<GA4ReactResolveInterface>}
   */
  public initialize(): Promise<GA4ReactResolveInterface> {
    return new Promise((resolve, reject) => {
      const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
      const scriptAsync: HTMLScriptElement = document.createElement('script');
      scriptAsync.setAttribute('async', '');
      scriptAsync.setAttribute(
        'src',
        `https://www.googletagmanager.com/gtag/js?id=${this.gaCode}`
      );
      scriptAsync.onload = () => {
        const scriptSync: HTMLScriptElement = document.createElement('script');

        let scriptHTML: string = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${this.gaCode}', ${JSON.stringify(this.config)});`;

        if (this.additionalGaCode) {
          this.additionalGaCode.forEach((code: string) => {
            scriptHTML += `gtag('config', '${code}');`;
          });
        }

        scriptSync.innerHTML = scriptHTML;

        head.appendChild(scriptSync);
        resolve({ pageview: this.pageview, gtag: this.gtag });
      };

      scriptAsync.onerror = (err: any) => {
        reject(err);
      };

      head.appendChild(scriptAsync);
    });
  }

  /**
   * @desc set new page or send pageview event
   * @param path
   */
  public pageview(path: string): void {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location,
      page_title: document.title,
    });
  }

  /**
   * @desc direct access to gtag
   * @param args
   */
  public gtag(...args: any): any {
    //@ts-ignore
    return window.gtag(args);
  }
}

export default GA4React;

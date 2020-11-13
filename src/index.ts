declare global {
  interface Window {
    gtag: Function;
  }
}

/**
 * @interface
 */
export interface GA4ReactInterface {
  initialize(): Promise<any>;
  pageview(path: string): void;
  gtag(...args: any): any;
}

/**
 * @desc class required to manage google analitycs 4
 * @class GA4React
 *  */
export class GA4React implements GA4ReactInterface {
  constructor(
    private gaCode: string,
    private config?: object,
    private additionalGaCode?: Array<string>
  ) {
    this.config = config || {};
    this.gaCode = gaCode;
  }
  initialize(): Promise<GA4ReactInterface> {
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
        resolve(this);
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
  pageview(path: string): void {
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
  gtag(...args: any): any {
    return window.gtag(args);
  }
}

export default GA4React;

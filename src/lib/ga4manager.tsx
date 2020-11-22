import {
  ga4Config,
  GA4ReactInterface,
  GA4ReactResolveInterface,
  gtagAction,
  gtagCategory,
  gtagFunction,
  gtagLabel,
} from './gtagModels';

declare global {
  interface Window {
    gtag: gtagFunction | Function;
    ga: Function;
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
    this.initialiedCorrectly = undefined;
  }

  private outputOnResolve(): GA4ReactResolveInterface {
    return {
      pageview: this.pageview,
      event: this.event,
      gtag: this.gtag,
    };
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

        const resolved: GA4ReactResolveInterface = this.outputOnResolve();

        if (window.ga) {
          Object.assign(resolved, { ga: this.ga });
        }
        resolve(resolved);
      };

      scriptAsync.onerror = (err: any) => {
        reject(err);
      };

      head.appendChild(scriptAsync);
    });
  }

  /**
   * @desc send pageview event to gtag
   * @param path
   */
  public pageview(path: string): any {
    return this.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location,
      page_title: document.title,
    });
  }

  /**
   * @desc set event and send to gtag
   * @param action
   * @param label
   * @param category
   * @param nonInteraction
   */
  public event(
    action: gtagAction,
    label: gtagLabel,
    category: gtagCategory,
    nonInteraction: boolean = false
  ): any {
    return this.gtag('event', action, {
      event_label: label,
      event_category: category,
      non_interaction: nonInteraction,
    });
  }

  /**
   * @desc direct access to ga
   * @param args
   */
  public ga(...args: any): any {
    //@ts-ignore
    return window.ga(...args);
  }

  /**
   * @desc direct access to gtag
   * @param args
   */
  public gtag(...args: any): any {
    //@ts-ignore
    return window.gtag(...args);
  }

  /**
   * @desc ga is initialized?
   */
  static isInitialized(): boolean {
    switch (typeof window.gtag === 'function') {
      case true:
        return true;
      default:
        return false;
    }
  }
}

export default GA4React;

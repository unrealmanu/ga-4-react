import {
  ga4Config,
  GA4ReactInterface,
  GA4ReactResolveInterface,
  gtagAction,
  gtagCategory,
  gtagFunction,
  gtagLabel,
} from './gtagModels';

export const GA4ReactGlobalIndex = '__ga4React__';

declare global {
  interface Window {
    gtag: gtagFunction | Function;
    ga?: Function;
    __ga4React__: GA4ReactResolveInterface;
  }
}

/**
 * @desc class required to manage google analitycs 4
 * @class GA4React
 *  */
export class GA4React implements GA4ReactInterface {
  private scriptSyncId: string = 'ga4ReactScriptSync';
  private scriptAsyncId: string = 'ga4ReactScriptAsync';
  constructor(
    private gaCode: string,
    private config?: ga4Config | object,
    private additionalGaCode?: Array<string>,
    private timeout?: number
  ) {
    this.config = config || {};
    this.gaCode = gaCode;
    this.timeout = timeout || 5000;
    this.additionalGaCode = additionalGaCode;
  }

  /**
   * @desc output on resolve initialization
   */
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
      if (GA4React.isInitialized()) {
        reject(new Error('GA4React is being initialized'));
      }

      // in case of retry logics, remove previous scripts
      const previousScriptAsync = document.getElementById(this.scriptAsyncId);
      if (previousScriptAsync) {
        previousScriptAsync.remove();
      }

      const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
      const scriptAsync: HTMLScriptElement = document.createElement('script');
      scriptAsync.setAttribute('id', this.scriptAsyncId);
      scriptAsync.setAttribute('async', '');
      scriptAsync.setAttribute('crossorigin', 'anonymous');
      scriptAsync.setAttribute(
        'src',
        `https://www.googletagmanager.com/gtag/js?id=${this.gaCode}`
      );
      scriptAsync.onload = () => {
        const target: HTMLElement | null = document.getElementById(
          this.scriptSyncId
        );
        if (target) {
          target.remove();
        }

        // in case of retry logics, remove previous script sync
        const previousScriptSync = document.getElementById(this.scriptSyncId);
        if (previousScriptSync) {
          previousScriptSync.remove();
        }

        const scriptSync: HTMLScriptElement = document.createElement('script');

        scriptSync.setAttribute('id', this.scriptSyncId);

        let scriptHTML: string = `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);};
        gtag('js', new Date());
        gtag('config', '${this.gaCode}', ${JSON.stringify(this.config)});`;

        if (this.additionalGaCode) {
          this.additionalGaCode.forEach((code: string) => {
            scriptHTML += `gtag('config', '${code}', ${JSON.stringify(
              this.config
            )});`;
          });
        }

        scriptSync.innerHTML = scriptHTML;

        head.appendChild(scriptSync);

        const resolved: GA4ReactResolveInterface = this.outputOnResolve();

        if (window.ga) {
          Object.assign(resolved, { ga: this.ga });
        }

        Object.assign(window, { [GA4ReactGlobalIndex]: resolved });

        resolve(resolved);
      };

      scriptAsync.onerror = (event: Event | string): void => {
        if (typeof event === 'string') {
          reject(`GA4React intialization failed ${event}`);
        } else {
          const error = new Error();
          error.name = 'GA4React intialization failed';
          error.message = JSON.stringify(event, [
            'message',
            'arguments',
            'type',
            'name',
          ]);
          reject(error);
        }
      };

      const onChangeReadyState = () => {
        switch (document.readyState) {
          case 'interactive':
          case 'complete':
            if (!GA4React.isInitialized()) {
              head.appendChild(scriptAsync);
              document.removeEventListener(
                'readystatechange',
                onChangeReadyState
              );
            }
            break;
        }
      };

      document.addEventListener('readystatechange', onChangeReadyState);

      setTimeout(() => {
        reject(new Error('GA4React Timeout'));
      }, this.timeout);
    });
  }

  /**
   * @desc send pageview event to gtag
   * @param path
   */
  public pageview(
    path: string | Location,
    location?: string | Location,
    title?: string
  ): any {
    return this.gtag('event', 'page_view', {
      page_path: path,
      page_location: location || window.location,
      page_title: title || document.title,
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
    switch (typeof window[GA4ReactGlobalIndex] !== 'undefined') {
      case true:
        return true;
      default:
        return false;
    }
  }

  /**
   * @desc get ga4react from global
   */
  static getGA4React(): GA4ReactResolveInterface | void {
    if (GA4React.isInitialized()) {
      return window[GA4ReactGlobalIndex];
    } else {
      console.error(new Error('GA4React is not initialized'));
    }
  }
}

export default GA4React;

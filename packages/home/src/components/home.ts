import { AppContext } from '../api';
// import { ev } from '../events';

// import { eventLink } from './event-link';
import { routeLink } from './route-link';

export function home(ctx: AppContext) {
  const ui = ctx.ui;
  return ['div', ui.root,
    ['div', ui.logo, [routeLink, ui.link, 'home', {}, 'pngupngu']],
    // ['ul', ui.nav,
    //   ['li', [routeLink, ui.link, 'orient', {}, 'orient']],
    //   ['li', [routeLink, ui.link, 'ui', {}, 'ui']],
    //   ['li', [eventLink, ui.link, [ev.ALERT, 'it works'], 'test alert']],
    // ]
  ];
}
import cx from 'classnames';
import { button } from '@thi.ng/hdom-components/button';

import { AppContext } from '../api';
import { ev } from '../events';
import { select } from './select';
import { slider } from './slider';
import { panel } from './panel';

const select_ = ({ ui }: AppContext) =>
  [select,
    { attribs: ui.select, onchange: e => console.log(e.target.value) },
    [[1, 'fuck'], [2, 'hello 100 you']], 2];

export const uiRoute = ({ ui, bus, views }: AppContext) => {
  const s = slider();
  const s1 = slider();
  const btn = button({ attribs: ui.button });
  const cbtn = (_: any, attribs: any, label: string) => {
    const attr = { attribs: { ...attribs, class: cx(ui.button.class, ui.control.class) } };
    return [btn, attr, label];
  };

  const cslider = (_: any, args: any, value: number) => {
    const attribs = {
      ...ui.slider,
      container: { class: cx(ui.slider.container.class, ui.control.class) },
    };
    return [s1, { attribs, ...args }, value];
  };

  const setValue = n => bus.dispatch([ev.SET_VALUE, n]);
  const cselect = () => {
    const attribs = {
      ...ui.select,
      container: {
        class: cx(ui.select.container.class, ui.control.class)
      }
    };
    return [select, { attribs }, [[1, 'fuck'], [2, 'hello 100 you']], 2];
  };

  return () =>
    ['div', ui.root,
      ['div', 'fuck you Lorem ipsum dolor sit amet,'],
      ['div', 'fuck you Lorem ipsum dolor sit amet,'],
      ['div',
        'fuck you',
        [btn, { onclick: console.log }, 'hello 100 you'],

        'select', select_,

        'slider',
        [s, { min: 0, max: 100, step: 2, attribs: ui.slider, onchange: setValue }, views.value.deref()],
      ],
      ['div',
        'fuck me',
        [btn, { onclick: console.log }, 'hello 100 you'],

        'select you', select_,
      ],

      [panel, ui.panel,
        ['param1', [cbtn, {}, 'fuck'], [cbtn, {}, 'You']],
        ['param2', [cbtn, {}, 'Fuck']],
        ['param3', [cbtn, {}, 'cao'], [btn, {}, 'B']],
        ['param4', cselect],
        ['param3', [cbtn, {}, 'caoB']],
        ['param5', [cslider, { min: 0, max: 100, step: 2, onchange: setValue }, views.value.deref()]],
        ['param3', [cbtn, {}, 'caoB']]]
    ];
};
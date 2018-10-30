import { UIAttrib, SelectAttribs, SliderAttribs, PanelAttribs } from './api';

export const panel: PanelAttribs = {
  container: { class: 'w5 bg-black-80 code f7' },
  label: { class: 'w-1 no-select nowrap white pa0 ph1' },
  content: { class: 'pv0 flex pa0' },
};

export const select: SelectAttribs = {
  container: { class: 'relative dib bg-gray h1 f6 hover-bg-mid-gray' },
  triangle: { class: 'absolute select-triangle' },
  dropdown: { class: 'outline-0 input-reset pointer br0 bn code f7 white bg-transparent pl1 pr3 w-100 tc tlc' }
};

export const button: UIAttrib = {
  class: 'input-reset dib f7 code button-reset outline-0 tc pointer no-select ' +
    'ph1 bn white bg-gray hover-bg-mid-gray v-btm pv-2'
};

export const slider: SliderAttribs = {
  container: { class: 'dib h1 f6 w4 bg-near-black relative ew-resize v-btm' },
  handle: { class: 'bg-gray tr' },
  value: { class: 'f7 code absolute--fill no-select ph1 white' },
};
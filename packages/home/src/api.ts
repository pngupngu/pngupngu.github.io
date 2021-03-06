import { IObjectOf } from "@thi.ng/api/api";
import { ViewTransform, IView } from "@thi.ng/atom/api";
import { EventDef, EffectDef, InterceptorContext } from "@thi.ng/interceptors/api";
import { EventBus } from "@thi.ng/interceptors/event-bus";
import { HTMLRouterConfig, RouteMatch } from "@thi.ng/router/api";

import { UIAttrib, ComponentAttrib } from '@pngu/ui/api';

import { CheckBoxAttribs, SelectAttribs, SliderAttribs, PanelAttribs } from '@pngu/ui/api';
import { Params } from '@pngu/scenes/wire';

export type Handlers = {
  events: IObjectOf<EventDef>;
  effects: IObjectOf<EffectDef>;
}

export type AppComponent = (ctx: AppContext, ...args: any[]) => any;

export interface Module {
  load(): Promise<any>;
  init(): InterceptorContext;
  release(): InterceptorContext;
}

interface Views {
  route: RouteMatch;
  routeComponent: any;
  raf: boolean;
  value: number;
  checked: boolean;
  params: Params;
  location: number[];
}

export type AppViews = { [P in keyof Views]: IView<Views[P]> };

export type ViewSpec = string | [string, ViewTransform<any>];

export interface AppConfig {
  domRoot: string | Element;
  router: HTMLRouterConfig;
  components: IObjectOf<any>;
  effects: IObjectOf<EffectDef>;
  events: IObjectOf<EventDef>;
  initialState: any;
  ui: UIAttribs;
  views: Partial<Record<keyof AppViews, ViewSpec>>;
}

export interface UIAttribs {
  [key: string]: Partial<UIAttrib> | ComponentAttrib<any>;

  checkbox: CheckBoxAttribs;
  inlineCheckbox: CheckBoxAttribs;
  select: SelectAttribs;
  cselect: SelectAttribs;
  inlineSelect: SelectAttribs;
  slider: SliderAttribs;
  cslider: SliderAttribs;
  inlineSlider: SliderAttribs;
  panel: PanelAttribs;
}

export interface AppContext {
  bus: EventBus;
  views: AppViews;
  ui: UIAttribs;
}
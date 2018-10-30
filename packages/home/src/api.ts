import { IObjectOf } from "@thi.ng/api/api";
import { ViewTransform, IView } from "@thi.ng/atom/api";
import { EventDef, EffectDef, InterceptorContext } from "@thi.ng/interceptors/api";
import { EventBus } from "@thi.ng/interceptors/event-bus";
import { HTMLRouterConfig, RouteMatch } from "@thi.ng/router/api";

import { UIAttrib, ComponentAttrib } from '@pngu/core/components/api';

import { SelectAttribs } from '@pngu/core/components/select';
import { SliderAttribs } from '@pngu/core/components/slider';
import { PanelAttribs } from '@pngu/core/components/panel';

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
  [key: string]: Partial<UIAttrib> | ComponentAttrib;

  select?: SelectAttribs;
  slider?: SliderAttribs;
  panel?: PanelAttribs;
}

export interface AppContext {
  bus: EventBus;
  views: AppViews;
  ui: UIAttribs;
}
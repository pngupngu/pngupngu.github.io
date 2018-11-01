import * as uuid from 'uuid/v4';
import { mat4, vec3 } from 'gl-matrix';
import * as twgl from 'twgl.js';
import { IObjectOf } from "@thi.ng/api/api";

export class Geometry {
  attributes: IObjectOf<any>;
}

export class Cube extends Geometry {
  constructor(size) {
    super();
    this.attributes = twgl.primitives.createCubeVertices(size);
  }
}

export class Plane extends Geometry {
  constructor(width, depth, subdivWidth = 1, subdivDepth = 1, matrix?) {
    super();
    this.attributes = twgl.primitives.createPlaneVertices(width, depth, subdivWidth, subdivDepth, matrix);
  }
}

type Uniforms = IObjectOf<any>;

export class Material {
  id: string = uuid();

  constructor(
    readonly vert: String,
    readonly frag: String,
    readonly uniforms: Uniforms = {}) { }
}

export class Node {
  protected _position: vec3 = vec3.create();

  children: Array<Node> = [];
  model: mat4 = mat4.create();

  set position(val: vec3) { this._position = val; }
  get position() { return this._position; }

  add(node) {
    this.children.push(node);
  }
}

export class Mesh extends Node {
  constructor(readonly geometry: Geometry, readonly material: Material) {
    super();
  }
}

export class Scene extends Node {
  width: number;
  height: number;

  update() { };

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export class Command {
  scene: Scene;
  programInfos: IObjectOf<any> = {};
  objects: Array<any> = [];

  constructor(readonly gl: WebGLRenderingContext, scene: Scene) {
    scene.children.forEach((mesh: Mesh) => {
      const { geometry, material: { id, vert, frag } } = mesh;
      let programInfo = this.programInfos[id];
      if (programInfo == undefined) {
        programInfo = twgl.createProgramInfo(gl, [vert, frag]);
        this.programInfos[id] = programInfo;
      }

      const bufferInfo = twgl.createBufferInfoFromArrays(gl, geometry.attributes);
      const vertexArrayInfo = twgl.createVertexArrayInfo(gl, programInfo, bufferInfo);

      this.objects.push({ programInfo, vertexArrayInfo, mesh });
    });
  }

  draw(_, vw, vh, fbo = null) {
    const gl = this.gl;
    gl.viewport(0, 0, vw, vh);

    twgl.bindFramebufferInfo(gl, fbo);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.disable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // const viewProjection = m4.multiply(camera.projection, camera.view);

    this.objects.forEach(obj => {
      const { mesh: { material } } = obj;
      obj.uniforms = {
        ...material.uniforms,
        screen: [vw, vh]
      };
      // uniforms.u_worldViewProjection = m4.multiply(viewProjection, mesh.model);
    });

    twgl.drawObjectList(gl, this.objects);
  }
}

export class Application {
  gl: WebGLRenderingContext;

  init(gl) { this.gl = gl }
  render(_) { }
}

export const getContext = (opts?: any) => (el: HTMLCanvasElement) => twgl.getContext(el, opts);
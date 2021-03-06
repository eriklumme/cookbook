import { AppLayoutElement } from "@vaadin/vaadin-app-layout/src/vaadin-app-layout";
import "@vaadin/vaadin-app-layout/theme/lumo/vaadin-app-layout";
import "@vaadin/vaadin-app-layout/vaadin-drawer-toggle";
import "@vaadin/vaadin-split-layout";
import "@vaadin/vaadin-tabs";
import { css, customElement, html, LitElement, property } from "lit-element";
import "../all-recipes";
import "../code-viewer";
import RecipeInfo from "../generated/com/vaadin/recipes/data/RecipeInfo";

@customElement("main-view")
export class MainView extends LitElement {
  @property({ type: Object })
  recipe: RecipeInfo = { howDoI: "", url: "", tags: [] };

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
      }
      .examplewrapper,
      code-viewer {
        flex: 1;
      }
      .layout {
        height: 100%;
      }
      .tag {
        padding: 0.3em;
        margin-right: 0.3em;
        font-size: var(--lumo-font-size-s);
        background: lightgrey;
        border-radius: 4px;
      }
    `;
  }

  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <vaadin-drawer-toggle
          slot="navbar touch-optimized"
        ></vaadin-drawer-toggle>
        <span slot="navbar touch-optimized">
          ${this.recipe.tags?.map(
            (tag) => html`<span class="tag">${tag}</span>`
          )}<span class="title">How do I ${this.recipe.howDoI}</span>
        </span>
        <all-recipes slot="drawer"></all-recipes>
        <vaadin-split-layout class="layout" orientation="vertical">
          <div class="examplewrapper">
            <div>${this.recipe.description}</div>
            <slot></slot>
          </div>
          <code-viewer .files=${this.recipe.sourceFiles || []}></code-viewer>
        </vaadin-split-layout>
      </vaadin-app-layout>
    `;
  }

  private _routerLocationChanged() {
    AppLayoutElement.dispatchCloseOverlayDrawerEvent();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      "vaadin-router-location-changed",
      this._routerLocationChanged
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      "vaadin-router-location-changed",
      this._routerLocationChanged
    );
  }
}

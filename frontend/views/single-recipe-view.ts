// import { AppLayoutElement } from "@vaadin/vaadin-app-layout/src/vaadin-app-layout";
import "@vaadin/vaadin-app-layout/theme/lumo/vaadin-app-layout";
import "@vaadin/vaadin-app-layout/vaadin-drawer-toggle";
import "@vaadin/vaadin-checkbox/vaadin-checkbox";
import "@vaadin/vaadin-split-layout";
import "@vaadin/vaadin-tabs";
import { css, customElement, html, LitElement, property } from "lit-element";
import "../all-recipes";
import "../code-viewer";
import RecipeInfo from "../generated/com/vaadin/recipes/data/RecipeInfo";

@customElement("single-recipe-view")
export class SingleRecipeView extends LitElement {
    @property({ type: Object })
    recipe: RecipeInfo = { howDoI: "", sourceFiles: [], url: "" };

    static get styles() {
        return css`=
    
        :host {
          height: 100%;
        }
        
        .secondary-header {
            background: #fff;
        }
        
        .recipe-title {
            margin: 0;
            font-size: var(--lumo-font-size-m);
        }
        
        .secondary-header .wrap {
            display: flex;
            justify-content: space-between;
        }
        
        .recipe-info, .recipe-action {
            display: flex;
            align-items: center;
        }
        
        .recipe-content {
            background: #fff;
            border-radius: var(--lumo-border-radius-xs);
            box-shadow: var(--lumo-box-shadow-xs);
            margin: var(--lumo-space-m) 0;
        }
    
    
    
    
        /** Move to univeral styling **/
      .main {
        height: 100%;
        background-color: red;
        display: flex;
        flex-direction: column;
        background: #0000;
      }
      
      .wrap {
        max-width: 1300px;
        width: 100%;
        margin: 0 auto;
        padding: 0 var(--lumo-space-l);
      }
      
      header {
        background: var(--lumo-shade);
        color: #fff;
        height: 50px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        
      }
      
      header .app-title {
        font-size: 1rem;
      }
      
      .content {
        flex: 1 1 auto;
        // overflow: auto;
      }
      
  
      
      .main-content {
        flex-grow: 1;
      }
      
      
      
    `;
    }

    render() {
        return html`
     
      <div class="main">
      
        <header>
          <div class="wrap">
              <h1 class="app-title">Cookbook</h1>
          </div>   
        </header>
        
        <div class="secondary-header">
          <div class="wrap">
            <div class="recipe-info">
                <vaadin-button theme="icon tertiary">
                    <iron-icon icon="vaadin:arrow-left"></iron-icon>
                </vaadin-button>
                <h2 class="recipe-title">Recipe name here ${this.recipe.howDoI}</h2>
                By <span>Author</span>
            </div>
            <div class="recipe-action">
                <div class="like-buttons">
                    <vaadin-button theme="icon tertiary">
                        <iron-icon slot="prefix" icon="vaadin:thumbs-up"></iron-icon>
                    </vaadin-button>
                    <vaadin-button theme="icon tertiary">
                        <iron-icon slot="prefix" icon="vaadin:thumbs-down"></iron-icon>
                    </vaadin-button>
                    <span class="like-count">+3</span>
                </div>
                
                <vaadin-button theme="icon tertiary">
                    <iron-icon slot="prefix" icon="vaadin:share"></iron-icon>
                    <span>Share</span>
                </vaadin-button>
            </div>
          </div>   
        </div>
        
        <div class="content">
          <div class="wrap">
            <div class="all-recipes">
                <div class="recipe-content">
                     <vaadin-split-layout class="layout" orientation="horizontal">
                          <div>
                            <code-viewer .files=${this.recipe.sourceFiles}></code-viewer>
                          </div>
                          <div class="examplewrapper">
                            <slot></slot>
                          </div>
                    </vaadin-split-layout>
                </div>
            </div>
          </div>
        </div>
      </div>
    `;
    }

    private _routerLocationChanged() {
        // AppLayoutElement.dispatchCloseOverlayDrawerEvent();
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

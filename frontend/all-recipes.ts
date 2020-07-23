import { TextFieldElement } from "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-text-field";
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
} from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import RecipeInfo from "./generated/com/vaadin/recipes/data/RecipeInfo";
import * as RecipeEndpoint from "./generated/RecipeEndpoint";
import { tsRecipeRoutes } from "./util";
import { updateCurrentRecipe } from ".";

export const recipes: RecipeInfo[] = [];

@customElement("all-recipes")
export class AllRecipes extends LitElement {
  @property({ type: String })
  filter: string = "";

  updateFilter = this.doUpdateFilter.bind(this);

  @query("#filterField")
  filterField: TextFieldElement | undefined;

  static get styles() {
    return css`
      :host {
        display: block;
      }
      
      .search-container {
        padding: var(--lumo-space-s) var(--lumo-space-m);
        border-bottom: 1px solid var(--lumo-shade-10pct);
      }
      
      /* Recipe Item*/
      .item {
        border-bottom: 1px solid var(--lumo-shade-10pct);
        display: flex;
        padding: var(--lumo-space-m);
        padding-bottom: var(--lumo-space-s);
      }
      
      .title {
        font-size: var(--lumo-font-size-xl);
        text-decoration: none;
        color: var(--lumo-text-color);
        margin: 0;
        font-weight: 500;
      }
      
      .description {
        padding-top: var(--lumo-space-s);
        padding-bottom: var(--lumo-space-m);
      }
      
      .thumbnail {
        width: 200px;
        flex-shrink: 0;
      }
      
      .info {
        flex: 1 1 auto;
      }
      
      .actions {
        display: flex;
        justify-content: space-between;
      }
      
      .like-count {
        background: var(--lumo-contrast-15pct);
        padding: 0 var(--lumo-space-m);
        border-radius: 20px;
      }
    `;
  }

  render() {
    return html`
      <div class="search-container">
        <vaadin-text-field
        clear-button-visible
        id="filterField"
        @value-changed="${this.updateFilter}"
        placeholder="Search for a recipe"
      ></vaadin-text-field>
      </div>
     

      <div>
        ${repeat(
          recipes.filter((recipe) =>
            recipe.howDoI.toLowerCase().includes(this.filter)
          ),
          (recipe) => recipe.url,
          (recipe) =>
            html`
                    <div class="item">
                        <div class="thumbnail">
                            <img src="/frontend/images/screenshot.png" alt="">
                        </div>
                        <div class="info">
                            <div><a class="title" href="${recipe.url}">${recipe.howDoI}</a></div>
                            <div>By <span class="author">Artur Signell</span></div>
                            <div class="description">Vaadin is a java web framework for building modern web apps and websites. You can create UIs in jave, or use HTML templates to create the UI, and then bind it to any backend using Java.</div>
                            <div class="actions">
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
                 `
        )}
      </div>
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    recipes.push(...tsRecipeRoutes.map((route) => route.info));
    recipes.push(...(await RecipeEndpoint.list()));
    recipes.sort((a, b) =>
      a.howDoI < b.howDoI ? -1 : a.howDoI == b.howDoI ? 0 : 1
    );
    await this.requestUpdate();
    updateCurrentRecipe();
  }
  doUpdateFilter() {
    this.filter = this.filterField?.value.toLowerCase() || "";
  }
}

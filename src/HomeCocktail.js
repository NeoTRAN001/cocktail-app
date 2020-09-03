import { LitElement, html, css } from 'lit-element';
import './menu-side';

export class HomeCokctail extends LitElement {

    static get properties() {
        return {
          dataCocktail: { type: Array },
          email: { type: String }
        };
    }

    constructor() {
        super();

        this.dataCocktail = [];
        this.email = "Test"

        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita', { method: 'POST' })
        .then((response) => {
            if (response.ok) return response.json();
            return Promise.reject(response);
        })
        .then((data) => { this._dataFormat(data); })
        .catch((error) => { console.warn('Something went wrong.', error); });
    }

    _dataFormat(data) {
        this.dataCocktail = JSON.stringify(data);
       
    }

    static get styles() {
        return css`
          :host {
            display: block; 
          }
          .grid {
              display: grid;
              grid-template-columns: 20% 70%;
          }
        `;
    }

    render() {
        return html`
            <div class="grid">
                <menu-side></menu-side>
                <div>
                    <div class="welcomeMessage">
                        <h2>Welcome ${this.email}!<h2>
                    </div>
                    ${this.dataCocktail}
                </div>
               
            </div>
        `;
    }
}

customElements.define('home-cocktail', HomeCokctail);
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
        let cocktails = [];

        data['drinks'].forEach((cocktail) => {
            cocktails.push({
                id: cocktail.idDrink,
                img: cocktail.strDrinkThumb,
                name: cocktail.strDrink,
            });
        });

        this.dataCocktail = cocktails;
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

          .card {
            background: #fff;
            color: black;
            border-radius: 2px;
            display: inline-block;
            height: 300px;
            margin: 1rem;
            position: relative;
            width: 300px;
            box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
          }          

          .imgCocktail {
              max-width: 100px;
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
                    ${this.dataCocktail.map(cocktail => html`
                        <div class="card">
                            <img class="imgCocktail" src="${cocktail.img}">
                            <p>${cocktail.name}</p>
                        </div>
                    `)}
                </div>
               
            </div>
        `;
    }
}

customElements.define('home-cocktail', HomeCokctail);
import { LitElement, html, css } from 'lit-element';
import './MenuSide';
import AlertInfo from'./AlertInfo';

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
        this.email = ""

        this._cocktailAPI("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic", false);

        this.addEventListener('categoryCocktail', (e) => {
            this._cocktailAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e.detail.category}`, false); 
        });

        this.addEventListener('nameCocktail', (e) => {
            this._cocktailAPI(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e.detail.name}`, true); 
        });
    }

    _cocktailAPI(url, aCocktail) {
        fetch(url, { method: 'GET' })
        .then((response) => {
            if (response.ok) return response.json();
            return Promise.reject(response);
        })
        .then((data) => { 
            if(!aCocktail) this._dataFormat(data); 
            else this._openModalInfo(data);
        })
        .catch((error) => { console.warn('Something went wrong.', error); });
    }

    _dataFormat(data) {
        let cocktails = [];
        this.dataCocktail = [];

        data['drinks'].forEach((cocktail) => {
            cocktails.push({
                id: cocktail.idDrink,
                img: cocktail.strDrinkThumb,
                name: cocktail.strDrink,
            });
        });

        this.dataCocktail = cocktails;
    }

    _infoCocktail(id) {
        this._cocktailAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, true);
    }

    _openModalInfo(data) {

        let cocktailInfo = [];
        let info = new AlertInfo();
        
        if(data['drinks']) {
            data['drinks'].forEach(cocktail => {
                cocktailInfo.push({
                    category: cocktail.strCategory,
                    img:      cocktail.strDrinkThumb,
                    name:     cocktail.strDrink,
                    ingredients: [
                        cocktail.strIngredient1,
                        " "+cocktail.strIngredient2,
                        " "+cocktail.strIngredient3,
                        " "+cocktail.strIngredient4
                    ]
                });
            });
    
            info.showModal(cocktailInfo);
        } else info.errorModal();
    }

    static get styles() {
        return css`
          :host {
            display: block; 
          }

          .grid {
              display: grid;
              grid-template-columns: 20% 80%;
          }

          menu-side {
            position: fixed;
          }

          .card {
            display: inline-block;
            height: 200px;
            width: 200px;
            margin: 1rem;
            position: relative;
          }

          .div-img .img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            transform: scale(1.2);
            -ms-transform: scale(1.2);
            -moz-transform: scale(1.2);
            -webkit-transform: scale(1.2);
            -o-transform: scale(1.2);
            -webkit-transition: all 500ms ease-in-out;
            -moz-transition: all 500ms ease-in-out;
            -ms-transition: all 500ms ease-in-out;
            -o-transition: all 500ms ease-in-out;
          }
          
          .div-img:hover .img {
            transform: scale(1);
            -ms-transform: scale(1);
            -moz-transform: scale(1);
            -webkit-transform: scale(1);
            -o-transform: scale(1);
            cursor: pointer;
          }

          @media screen and (max-width: 930px) {
            .grid {
                display: grid;
                grid-template-columns: 40% 60%;
            }
          }  
          
          @media screen and (max-width: 620px) {
            .grid {
                display: grid;
                grid-template-columns: 100%;
            }

            menu-side {
                display: none;
            }
          }
        `;
    }

    render() {
        return html`
            <div class="grid">
                <div>
                    <menu-side></menu-side>
                </div>
                <div>
                    <h2>Welcome ${this.email}!<h2>
                    ${this.dataCocktail.map(cocktail => html`
                        <div class="card">
                            <div class="div-img hidden" >
                                <img @click=${() => this._infoCocktail(cocktail.id)} class="img" src="${cocktail.img}">
                            </div>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }
}

customElements.define('home-cocktail', HomeCokctail);
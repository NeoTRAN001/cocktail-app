import { LitElement, html, css } from 'lit-element';

export class MenuSide extends LitElement {

    _getDrinks(category) {
        this.dispatchEvent(new CustomEvent('categoryCocktail', {
            detail: { category }, bubbles: true, composed: true
        }));  
    }

    _getDrinkName(e) {  
        if(e.keyCode == 13) {
            let name = this.shadowRoot.querySelector("#inputSearch").value;
            name = name.toLowerCase();
            this.dispatchEvent(new CustomEvent('nameCocktail', {
                detail: { name }, bubbles: true, composed: true
            }));  
        }
    }

    render() {
        return html`
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
            <div class="ui vertical menu" style="background: #37374D; height: 550px;">
            <div class="item" style="background: #C9ADA7;">
                <div class="ui transparent icon input">
                    <input id="inputSearch" @keypress="${this._getDrinkName}" type="text" placeholder="Search cocktail...">
                    <i class="icon">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                        </svg>
                    </i>
                    </div>
                </div>
                <a class="item" @click="${() => this._getDrinks("Ordinary_Drink")}">
                    Ordinary_Drink
                    <div class="ui label">99</div>
                </a>
                <a class="item" @click="${() => this._getDrinks("Cocktail")}">
                    Cocktail    
                    <div class="ui label">99</div>
                </a>
                <div class="item">
                    <img class="image" src="img/martini.svg" alt="">
                </div>
            </div>
        `;
    }

    static get styles() {
        return css`
            .item {
                color: white;
            }

            .image {
                margin-top: 81px !important;   
            }
        `;  
    }
}

customElements.define('menu-side', MenuSide);
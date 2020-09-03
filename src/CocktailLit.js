import { LitElement, html, css } from 'lit-element';
import './LoginComp';
import './HomeCocktail';

export class CocktailLit extends LitElement {
  static get properties() {
    return {
      logged: { type: Boolean },
      email:  { type: String}
    };
  }

  constructor() {
    super();

    this.logged = true;

    this.addEventListener('LoginSuccess', (e) => { 
      this._enterHome(e.detail.success, e.detail.message, e.detail.email);
    });
  }

  _enterHome(success, message, email) {
    if(success) {
      this.logged = true;
      this.email = email;
      // Agregar un toast para indicar que todo bien
    } else {
      this.logged = false;
      // Agregar un toast para indicar el error
    }
  }

  static get styles() {
    return css`
      :host {
        display: block; 
      }
    `;
  }

  render() {
    return html`
      ${this.logged 
          ? html`<home-cocktail email="${this.email}"></home-cocktail>` 
          : html`<login-comp></login-comp>`
      }
    `;
  }
}

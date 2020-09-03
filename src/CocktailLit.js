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

    this.logged = false;

    this.addEventListener('LoginSuccess', (e) => { 
      this._enterHome(e.detail.success, e.detail.message, e.detail.email);
    });
  }

  _enterHome(success, message, email) {
    if(success) {
      this.logged = true;
      this.email = email;
      alert('Mensaje temporal de bienvenida :D');
    } else {
      this.logged = false;
      alert('Mensaje temporal de error :(');
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

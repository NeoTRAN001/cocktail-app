import { LitElement, html, css } from 'lit-element';
import AlertInfo from'./AlertInfo';
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
    let info = new AlertInfo();

    if(success) {
      this.logged = true;
      this.email = email;
      info.successModal("Welcome :D")
    } else {
      this.logged = false;
      info.errorModal("Enter a valid email and password");
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

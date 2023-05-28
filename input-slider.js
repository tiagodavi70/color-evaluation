import { html, css, svg, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.4.0/dist/shoelace-autoloader.js';

export class InputSlider extends LitElement {
	static styles = css`
		.slider {
			/* margin: 4%;
			padding: 4%;
			width: 100px; */
		}
  	`;

	static properties = {
		value: { type: Number },
		label: { type: String },
		text: { type: Boolean },
		min: { type: Number },
		max: { type: Number },
		step: { type: Number },
		labelMin: { type: Boolean },
		labelMax: { type: Boolean },
	};

	constructor() {
		super();
		this.value = 0;
		this.label = "";
		this.text = true;
		this.min = 0;
		this.max = 100;
		this.step = .01;
		this.labelMin = false;
		this.labelMax = false;
	}

	updateRange() { this.value = this.renderRoot?.querySelector("input").value; this.updateValues(); }
	updateText() { this.value = this.renderRoot?.querySelector("sl-input").value; this.updateValues(); }

	updateValues() {
		this.renderRoot.querySelector("input").value = +this.value;	
		this.renderRoot.querySelector("sl-input").value = +this.value;
		const event = new Event('sl-input', {bubbles: true, composed: true});
		this.dispatchEvent(event);
	}

	render() {
		console.log(this)
		return html`
		<div>${this.label}</div>
		<div style="display: flex;">
			<input type="range" class="slider" min="${this.min}" max="${this.max}"
				step="${this.step}" value="${this.value}"  @input=${this.updateRange}></input>
			<sl-input type="number" value="${this.value}" min="${this.min}" max="${this.max}" step="${this.step}"
				@input=${this.updateText}></sl-input>
		</div>
	`
	}
}
customElements.define('input-slider', InputSlider);

import { html, css, svg, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { CategoricalColors } from './colorscale.js';

export class CategoricalDynamic extends CategoricalColors {
	static styles = css`
		.inside-button {
			cursor: pointer;
			text-align:center;
			box-shadow: 0 8px 1px gray;
			filter: drop-shadow( 0px 8px 0px rgba(0, 0, 0, .6));
		}
		.unselected {
			fill:#F8F8F8;
		}
		.unselected:hover {
			fill:#E1E1E1;
		}
		.selected {
			fill: #999
		}
		.selected:hover {
			fill: #999
		}
  	`;

	// static properties = {
	// 	width: { type: Number },
	// 	colors: { type: Object }
	// };

	constructor() {
		super();
		this.selected = [];
		this.eventsOff = true;
		this.historic = [];
	}

	_swap() {
		let a = +this.selected[0].split("-")[1];
		let b = +this.selected[1].split("-")[1];
		console.log(a,b);

		let temp = this.colors[a];
		this.colors[a] = this.colors[b];
		this.colors[b] = temp;
		this.colors = JSON.parse(JSON.stringify(this.colors));
		this.selected = [];
		this._resetButtonColors();
		this.historic.push(this.colors);
	}

	render() {
		let colorSize = ((this.width - this.padding) / this.colors.length);
		let sqHeight = this.height - 2 * this.padding;
		let sqWidth = colorSize - this.padding;
		this.historic.push(this.colors);

		return html`<div style="display: flex;">
			${this.colors.map((c, i) =>
				html`
				<div>
					<div style="background-color:${c}; border: 1px solid black; width:${sqWidth}; height:${sqHeight}"></div>
					<div class="round-button">
					${!((i == 0) || (i == this.colors.length - 1)) ? html`
						<svg width=${sqWidth} height=${sqHeight * 1.8} fill="black" id="button-${i}" @click=${this._selected}>
							<circle r="40%" cx="${sqWidth/2 + 1}" cy="${sqHeight / 1.2}"
									stroke-width="5" stroke="#A1A1A1" class="inside-button" />
							<text style="pointer-events: none;" stroke="black" x="${sqWidth/2 - 3}" y="${(sqHeight / 1.2) + sqHeight*.15}"> ${i} </text>
						</svg>
					`: ""}
					</div>
				</div>
				`)
			}
			</div>
		</div>`
	}

	_resetButtonColors() {
		let buttons = this.renderRoot.querySelectorAll("svg .inside-button");
		Array.from(buttons).forEach((element) => {
			element.classList.remove("selected");
			element.classList.remove("unselected");
			element.classList.add("unselected");
		});
	}

	updated(changedProperties) {

		let buttons = this.renderRoot.querySelectorAll("svg .inside-button");
		this._resetButtonColors();
		if (this.eventsOff) {
			Array.from(buttons).forEach((element) => {
				element.addEventListener("click", (event) => {
					console.log(!this.selected.includes(element.parentNode.id))
					if (!this.selected.includes(element.parentNode.id)) {
						element.classList.replace("unselected", "selected");
						this.selected.push(element.parentNode.id);
					} else {
						element.classList.replace("selected", "unselected");
						this.selected = [];
					}
					if (this.selected.length >= 2) {
						this._swap();
					}
				});
			})
		}
		this.eventsOff = false;
	}
}
// html`<button style="padding:0px; margin: 1px; width:${colorSize - this.padding}; height:${this.height - 2 * this.padding}">${i}</button>`)

customElements.define('categorical-dyn', CategoricalDynamic);

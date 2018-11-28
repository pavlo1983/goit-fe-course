import v4 from "uuid/v4";

export default class Model {
	constructor(items = []) {
		this.items = items;
	}

	addItem(text) {
		const item = {
			id: v4(),
			text
		};
    }
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
    }
}

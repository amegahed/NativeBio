/******************************************************************************\
|                                                                              |
|                              table-list-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an abstract view for displaying a generic list.          |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import BaseView from '../../../views/base-view.js';
import ListView from '../../../views/collections/lists/list-view.js';
import TableListItemView from '../../../views/collections/tables/table-list-item-view.js';

export default ListView.extend({

	//
	// attributes
	//

	tagName: 'table',

	// views
	//
	childView: TableListItemView,
	childViewContainer: 'tbody',

	emptyView: BaseView.extend({
		className: 'empty',
		template: template('No items.')
	}),

	// prepended and appended columns
	//
	prepended: ['select-group', 'select'],
	appended: [],

	selectable: true,

	events: {
		'mousedown th': 'onMouseDownTableHead'
	},

	//
	// constuctor
	//

	initialize: function() {

		// update view on collection change
		//
		this.listenTo(this.collection, 'remove', this.update, this);
	},

	//
	// numbering methods
	//

	setShowNumbering: function(showNumbering) {
		if (showNumbering) {
			this.$el.addClass('numbered');
		} else {
			this.$el.removeClass('numbered');
		}
	},

	setFlush: function(isFlush) {
		if (isFlush) {
			this.$el.addClass('flush');
		} else {
			this.$el.removeClass('flush');
		}
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		ListView.prototype.onRender.call(this);

		// mark non-shaded table cells
		//
		this.markPrependedTableCells(this.$el.find('th, td'));
		this.markAppendedTableCells(this.$el.find('th, td'));

		// mark first and last table cells (for rounded corners)
		//
		this.markFirstTableCells();
		this.markLastTableCells();

		// add optional numbering
		//
		this.setShowNumbering(this.show_numbering);
		this.setFlush(this.flush);
	},

	markPrependedTableCells: function(elements) {
		for (let i = 0; i < elements.length; i++) {
			let element = $(elements[i]);

			loop2:
				for (let i = 0; i < this.prepended.length; i++) {
					let className = this.prepended[i];

					if (element.hasClass(className)) {
						element.addClass('prepend');
						break loop2;
					}
				}
		}
	},

	markAppendedTableCells: function(elements) {
		for (let i = 0; i < elements.length; i++) {
			let element = $(elements[i]);

			loop2:
				for (let i = 0; i < this.appended.length; i++) {
					let className = this.appended[i];

					if (element.hasClass(className)) {
						element.addClass('append');
						break loop2;
					}
				}
		}
	},

	markFirstTableCells: function() {
		let index;

		// find first non prepended column
		//
		let cells = this.$el.find('th');
		for (let i = 0; i < cells.length; i++) {
			let cell = cells[i];
			let cellClass = $(cell).attr('class');
			if (cellClass && !cellClass.contains('prepend')) {
				index = i;
				break;
			}
		}
		$(cells[index]).addClass('first');

		// mark first cell of each row
		//
		let rows = this.$el.find('tr');
		for (let i = 0; i < rows.length; i++) {
			let row = rows[i];
			cells = $(row).find('td');
			$(cells[index]).addClass('first');
		}
	},

	markLastTableCells: function() {
		let index;

		// find last non appended column
		//
		let cells = this.$el.find('th');
		for (let i = 0; i < cells.length; i++) {
			let cell = cells[i];
			let cellClass = $(cell).attr('class');
			if (cellClass && !cellClass.contains('append')) {
				index = i;
			}
		}
		$(cells[index]).addClass('last');

		// mark last cell of each row
		//
		let rows = this.$el.find('tr');
		for (let i = 0; i < rows.length; i++) {
			let row = rows[i];
			cells = $(row).find('td');
			$(cells[index]).addClass('last');
		}
	},

	attachHtml: function(elements) {

		// mark non-shaded table cells
		//
		this.markPrependedTableCells($(elements).find('td'));
		this.markAppendedTableCells($(elements).find('td'));

		// add elements to DOM
		//
		this.Dom.appendContents($(this.el).find('tbody'), elements);
	},

	//
	// mouse event handling methods
	//

	onMouseDownTableHead: function() {
		if (this.selectable) {
			this.deselectAll();
		}
	}
});
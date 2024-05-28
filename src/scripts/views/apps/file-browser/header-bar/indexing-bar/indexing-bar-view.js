/******************************************************************************\
|                                                                              |
|                             indexing-bar-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the view for an indexing toolbar.                        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ToolbarView from '../../../../../views/apps/common/toolbars/toolbar-view.js';
import ShareByIndexButtonView from '../../../../../views/apps/file-browser/header-bar/indexing-bar/buttons/share-by-index-button-view.js';

export default ToolbarView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="share-by-index" data-toggle="tooltip" title="Share by Search Index" data-placement="bottom"></div>
	`),

	regions: {
		index: '.share-by-index'
	},

	enabled: function() {
		let numSelected = this.app.numSelected();
		let oneSelected = numSelected == 1;
		let model = oneSelected? this.app.getSelectedModel() : this.app.model;
		let indexable = model != undefined && model.isIndexable();

		return {
			'share-by-index': indexable
		};
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		ToolbarView.prototype.onRender.call(this);

		// show child views
		//
		this.showChildView('index', new ShareByIndexButtonView());
	},

	//
	// selection event handling methods
	//

	onSelect: function() {
		this.update();
	},

	onDeselect: function() {
		this.update();
	}
});
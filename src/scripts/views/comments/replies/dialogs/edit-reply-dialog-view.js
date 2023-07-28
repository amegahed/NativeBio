/******************************************************************************\
|                                                                              |
|                           edit-reply-dialog-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a modal dialog box used for editing existing replies.         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import DialogView from '../../../../views/dialogs/dialog-view.js';
import ReplyFormView from '../../../../views/comments/replies/forms/reply-form-view.js';

export default DialogView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="modal-dialog">
		
			<div class="modal-header">
				<div class="heading">
					<div class="icon">
						<i class="fa fa-pencil-alt"></i>
					</div>
					<div class="title">
						Edit Reply
					</div>
				</div>
			</div>
			
			<div class="modal-content">
				<div class="modal-body">
					<div class="new-reply panel"></div>
				</div>
		
				<div class="modal-footer">
					<div class="buttons">
						<button class="submit btn btn-primary" data-dismiss="modal" disabled>
							<i class="active fa fa-save"></i>Save
						</button>
						<button class="cancel btn" data-dismiss="modal">
							<i class="fa fa-xmark"></i>Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	`),

	regions: {
		form: '.new-reply'
	},

	events: _.extend({}, DialogView.prototype.events, {
		'click .submit': 'onClickSubmit'
	}),

	//
	// rendering methods
	//

	setSubmitDisabled: function(disabled) {
		this.$el.find('.submit').prop('disabled', disabled !== false);
	},

	onRender: function() {

		// call superclass method
		//
		DialogView.prototype.onRender.call(this);

		// show child views
		//
		this.showChildView('form', new ReplyFormView({
			model: this.model,
			collection: this.model.get('attachments'),

			// options
			//
			attachable: true,
			uploadable: true,
			submitable: false,
			cancelable: false,
			preferences: this.options.preferences,

			// callbacks
			//
			onvalidate: (valid) => this.setSubmitDisabled(!valid),
			onsubmit: () => this.onSubmit()
		}));
	},

	onShow: function() {

		// call superclass method
		//
		DialogView.prototype.onShow.call(this);

		// handle form
		//
		this.getChildView('form').onShow();
	},
	
	//
	// event handling methods
	//

	onSubmit: function() {

		// perform callback
		//
		if (this.options.onsubmit) {
			this.options.onsubmit(this.model);
		}
	},

	onClickSubmit: function() {
		this.getChildView('form').submit();
	},

	//
	// keyboard event handling methods
	//

	onKeyDown: function(event) {
		if (this.hasChildView('form')) {
			this.getChildView('form').onKeyDown(event);
		}
	}
});
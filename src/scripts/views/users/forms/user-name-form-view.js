/******************************************************************************\
|                                                                              |
|                            user-name-form-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a editable form view of the user's name.                      |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormView from '../../../views/forms/form-view.js';

export default FormView.extend({

	//
	// attributes
	//

	template: template(`
		<fieldset>
			<legend>Personal info</legend>
		
			<div class="first-name form-group">
				<label class="required control-label"><i class="fa fa-quote-left"></i>First name</label>
				<div class="controls">
					<div class="input-group">
						<input type="text" class="required form-control" name="first-name" value="<%= first_name %>" />
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="First name" data-content="This is your first name or given name."></i>
						</div>
					</div>
				</div>
			</div>
		
			<div class="last-name form-group">
				<label class="required control-label"><i class="fa fa-quote-right"></i>Last name</label>
				<div class="controls">
					<div class="input-group">
						<input type="text" class="required form-control" name="last-name" value="<%= last_name %>" />
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Last name" data-content="This is your family name or surname."></i>
						</div>
					</div>
				</div>
			</div>
		</fieldset>
	`),

	//
	// form attributes
	//

	messages: {
		'first-name': {
			required: "Enter your given / first name."
		},
		'last-name': {
			required: "Enter your family / last name."
		},
		'preferred-name': {
			required: "Enter your preferred / nickname."
		}
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'honorific':
				return this.$el.find('.honorific option:selected').val();
			case 'first_name':
				return this.$el.find('.first-name input').val();
			case 'preferred_name':
				return this.$el.find('.preferred-name input').val();
			case 'middle_name':
				return this.$el.find('.middle-name input').val();
			case 'last_name':
				return this.$el.find('.last-name input').val();
			case 'title':
				return this.$el.find('.title option:selected').val();
		}
	},

	getValues: function() {
		return {
			honorific: this.getValue('honorific'),
			first_name: this.getValue('first_name'),
			preferred_name: this.getValue('preferred_name'),
			middle_name: this.getValue('middle_name'),
			last_name: this.getValue('last_name'),
			titles: this.getValue('title')
		};
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		FormView.prototype.onRender.call(this);

		// hide details
		//
		if (this.options.collapsed) {
			this.$el.find('.details').remove();
		}
	}
});
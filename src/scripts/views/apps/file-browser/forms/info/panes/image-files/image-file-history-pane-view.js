/******************************************************************************\
|                                                                              |
|                        image-file-history-pane-view.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing file history information.             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormView from '../../../../../../../views/forms/form-view.js';

export default FormView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="form-group">
			<label class="control-label"><i class="fa fa-calendar-alt"></i>Captured</label>
			<div class="controls">
				<p class="form-control-static">
					<%= captured_at? captured_at.format() : 'unknown' %>
				</p>
			</div>
		</div>
		
		<div class="form-group">
			<label class="control-label"><i class="fa fa-magic"></i>Created</label>
			<div class="controls">
				<p class="form-control-static">
					<%= created_at && created_at.format? created_at.format() : created_at %>
				</p>
			</div>
		</div>
		
		<div class="form-group">
			<label class="control-label"><i class="fa fa-pencil-alt"></i>Modified</label>
			<div class="controls">
				<p class="form-control-static">
					<%= modified_at && modified_at.format? modified_at.format() : modified_at %>
				</p>
			</div>
		</div>
		
		<div class="form-group">
			<label class="control-label"><i class="fa fa-eye"></i>Accessed</label>
			<div class="controls">
				<p class="form-control-static">
					<%= accessed_at && accessed_at.format? accessed_at.format() : accessed_at %>
				</p>
			</div>
		</div>
	`),

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			captured_at: this.model.hasCaptureDate()? this.model.getCaptureDate() : null
		};
	},
});

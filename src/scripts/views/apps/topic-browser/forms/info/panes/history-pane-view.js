/******************************************************************************\
|                                                                              |
|                             history-pane-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a form for a post topic's history information.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormView from '../../../../../../views/forms/form-view.js';

export default FormView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="form-group">
			<label class="control-label"><i class="fa fa-magic"></i>Created</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof created_at != 'undefined') { %>
					<%= created_at && created_at.format? created_at.format() : created_at %>
					<% } %>
				</p>
			</div>
		</div>

		<div class="form-group">
			<label class="control-label"><i class="fa fa-pencil-alt"></i>Updated</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof updated_at != 'undefined') { %> 
					<%= updated_at && updated_at.format? updated_at.format() : updated_at %>
					<% } %>
				</p>
			</div>
		</div>
	`)
});
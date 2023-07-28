/******************************************************************************\
|                                                                              |
|                            video-info-pane-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing video file information.               |
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
			<label class="control-label"><i class="fa fa-arrows-alt"></i>Resolution</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof resolution != 'undefined') { %>
					<%= resolution.width %> x <%= resolution.height %> px
					<% } else { %>
					No info
					<% } %>
				</p>
			</div>
		</div>
		
		<div class="form-group">
			<label class="control-label"><i class="fa fa-clock"></i>Duration</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof duration != 'undefined') { %>
					<%= duration %> sec
					<% } else { %>
					No info
					<% } %>
				</p>
			</div>
		</div>
		
		<div class="form-group">
			<label class="control-label"><i class="fa fa-truck"></i>Bit Rate</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof bit_rate != 'undefined') { %>
					<%= bit_rate %> bps
					<% } else { %>
					No info
					<% } %>
				</p>
			</div>
		</div>
	`),

	//
	// rendering methods
	//

	templateContext: function() {
		return this.model.get('tags');
	}
});

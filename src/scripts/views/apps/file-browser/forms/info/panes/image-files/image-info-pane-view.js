/******************************************************************************\
|                                                                              |
|                            image-info-pane-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing photo image file information.         |
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
		<% if (typeof resolution != 'undefined' && resolution) { %>
		<div class="resolution form-group">
			<label class="control-label"><i class="fa fa-arrows-alt"></i>Resolution</label>
			<div class="controls">
				<p class="form-control-static">
					<%= resolution[0] %> x <%= resolution[1] %> px
				</p>
			</div>
		</div>
		<% } %>
		
		<% if (typeof dimensions != 'undefined' && dimensions) { %>
		<div class="dimensions form-group">
			<label class="control-label"><i class="fa fa-arrows-alt"></i>Dimensions</label>
			<div class="controls">
				<p class="form-control-static">
					<% if (typeof dimensions[0] && dimensions[1]) { %>
					<%= dimensions[0] %> x <%= dimensions[1] %>
					<% } else { %>
					<%= dimensions %>
					<% } %>
				</p>
			</div>
		</div>
		<% } %>
		
		<% if (typeof exposure != 'undefined') { %>
		<div class="form-group">
			<label class="control-label"><i class="fa fa-clock"></i>Exposure</label>
			<div class="controls">
				<p class="form-control-static">
					<%= exposure %>
				</p>
			</div>
		</div>
		<% } %>
		
		<% if (typeof aperture != 'undefined') { %>
		<div class="form-group">
			<label class="control-label"><i class="fa fa-dot-circle"></i>Aperture</label>
			<div class="controls">
				<p class="form-control-static">
					<%= aperture %>
				</p>
			</div>
		</div>
		<% } %>
		
		<% if (typeof iso != 'undefined') { %>
		<div class="form-group">
			<label class="control-label"><i class="fa fa-film"></i>ISO</label>
			<div class="controls">
				<p class="form-control-static">
					<%= iso %>
				</p>
			</div>
		</div>
		<% } %>
		
		<% if (typeof focal_length != 'undefined') { %>
		<div class="form-group">
			<label class="control-label"><i class="fa fa-arrows-alt-h"></i>Focal Length</label>
			<div class="controls">
				<p class="form-control-static">
					<%= focal_length %>
				</p>
			</div>
		</div>
		<% } %>
		
		<% if (typeof make_model != 'undefined') { %>
		<div class="form-group">
			<label class="control-label"><i class="fa fa-camera"></i>Make / Model</label>
			<div class="controls">
				<p class="form-control-static">
					<%= make_model %>
				</p>
			</div>
		</div>
		<% } %>

		<% if (typeof upper_left != 'undefined') { %>
		<div class="form-group">
			<label class="control-label"><i class="fa fa-globe-americas"></i>Upper Left</label>
			<div class="controls">
				<p class="form-control-static">
					<%= upper_left %>
				</p>
			</div>
		</div>
		<% } %>

		<% if (typeof upper_right != 'undefined') { %>
		<div class="form-group">
			<label class="control-label"><i class="fa fa-globe-americas"></i>Upper Right</label>
			<div class="controls">
				<p class="form-control-static">
					<%= upper_right %>
				</p>
			</div>
		</div>
		<% } %>

		<% if (typeof lower_left != 'undefined') { %>
		<div class="form-group">
			<label class="control-label"><i class="fa fa-globe-americas"></i>Lower Left</label>
			<div class="controls">
				<p class="form-control-static">
					<%= lower_left %>
				</p>
			</div>
		</div>
		<% } %>

		<% if (typeof lower_right != 'undefined') { %>
		<div class="form-group">
			<label class="control-label"><i class="fa fa-globe-americas"></i>Lower Right</label>
			<div class="controls">
				<p class="form-control-static">
					<%= lower_right %>
				</p>
			</div>
		</div>
		<% } %>
	`),

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			exposure: this.model.getAttribute('exposure'),
			aperture: this.model.getAttribute('aperture'),
			iso: this.model.getAttribute('iso'),
			focal_length: this.model.getAttribute('focal_length'),
			make_model: this.model.getAttribute('make_model'),
			upper_left: this.model.getAttribute('upper_left'),
			upper_right: this.model.getAttribute('upper_right'),
			lower_left: this.model.getAttribute('lower_left'),
			lower_right: this.model.getAttribute('lower_right')
		};
	}
});
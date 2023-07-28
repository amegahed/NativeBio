<h1><i class="<%= config.apps['messenger'].icon %>"></i><%= config.apps['messenger'].name %></h1>

<ol class="breadcrumb">
	<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
	<li><a href="#apps"><i class="fa fa-rocket"></i>Apps</a></li>
	<li><i class="fa fa-comments"></i><%= config.apps['messenger'].name %></li>
</ol>

<div class="content">
	<div class="attention icon colored <%= config.apps['messenger'].color %>">
		<img src="images/icons/apps/<%= config.apps['messenger'].image || config.apps['messenger'].app + '.svg' %>" />
	</div>

	<div class="description section">
		<p>The <%= config.apps['messenger'].name %> app lets you view and post news updates and exchange direct messages. </p>
	</div>

	<div class="details section">
		<div class="row">
			<div class="col-sm-6">
				<h2><i class="fa fa-check"></i>Features</h2>
				<ul>
					<li>Read friends' news posts and post your own news updates.</li>
					<li>Post new articles, comment on existing posts, and reply to comments.</li>
					<li>'Like' posts, comments, and replies.</li>
					<li>Include files and photos with your posts.</li>
					<li>Organize and view posts according to topic.</li>
					<li>Create new public or private news topics and invite friends to join the discussion.</li>
					<li>Direct message friends in a private chat.</li>
					<li>Invite one or more friends to a chat session.</li>
					<li>Attach photos, files, and folders to chat messages.</li> 
				</ul>
			</div>
			<div class="col-sm-6">
				<h2><i class="fa fa-star"></i>Benefits</h2>
				<ul>
					<li>Allows you to keep up-to-date with events in the lives of your friends.</li>
					<li>Enables open online discussions with your friends. </p>
				</ul>
			</div>
		</div>
	</div>

	<h2><i class="fa fa-info-circle"></i>For More Information</h2>
	<ul>
		<li><a href="#help/sharing-news">Sharing News</a></li>
	</ul>
	
	<h2><i class="fa fa-desktop"></i>Screen Shots</h2>
	<div class="figure desktop-only">
		<a href="images/info/apps/messenger/messenger.png" target="_blank" class="lightbox" title="Messages"><img class="dialog" src="images/info/apps/messenger/messenger.png" /></a>
		<div class="caption">Messages</div>
	</div>
	<div class="figure mobile-only">
		<a href="images/info/apps/topic-viewer/mobile/mobile-messenger.png" target="_blank" class="lightbox" title="Messages"><img src="images/info/apps/topic-viewer/mobile/mobile-messenger.png" /></a>
		<div class="caption">Messages</div>
	</div>
</div>
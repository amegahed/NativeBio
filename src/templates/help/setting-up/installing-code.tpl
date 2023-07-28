<h1><i class="fa fa-code"></i>Installing the Code</h1>

<ol class="breadcrumb">
	<li><a href="#help"><i class="fa fa-question-circle"></i>Help</a></li>
	<li><a href="#help/setting-up"><i class="fa fa-laptop"></i>Setting Up</a></li>
	<li><i class="fa fa-code"></i>Installing the Code</li>
</ol>

<div class="content">
	<p>Once you have a web server set up and ready to use, you can set up <%= application.name %> by performing the following steps:</p>

	<ol>
		<li>
			<h2><i class="fa fa-file"></i>Obtain the Files</h2>
			<p>To install the code, you will need to obtain the following files from <%= application.name %>: </p>
			<ul>
				<li><%= application.name.toLowerCase() %>.zip</li>
				<li><%= application.name.toLowerCase() %>-server.zip</li>
			</ul>

			<div class="icon-grid figure">
				<div class="file item">
					<div class="row">
						<div class="icon"><img src="images/icons/files/zip.svg" /></div>
					</div>
					<div class="row">
						<div class="name"><%= application.name.toLowerCase() %>.zip</div>
					</div>
				</div>

				<div class="file item">
					<div class="row">
						<div class="icon"><img src="images/icons/files/zip.svg" /></div>
					</div>
					<div class="row">
						<div class="name"><%= application.name.toLowerCase() %>-server.zip</div>
					</div>
				</div>
			</div>
		</li>

		<li>
			<h2><i class="fa fa-laptop"></i>Install the Web Client Files</h2>
			<p>First, you will need to install the file associated with the web client. The web client is the portion of the application that displays the user interface that the user sees and interacts with. </p>

			<ol>
				<li>
					<h3>Extract web client files</h3>
					<p>Extract the files contained in the file "<%= application.name.toLowerCase() %>.zip".  When this file is extracted, it should create a folder named "<%= application.name.toLowerCase() %>" which contains a number of sub-folders with names like "scripts", "styles", and "templates". </p>

					<div class="figure">
						<a href="images/help/setting-up/system-installation/client-files.png" target="_blank" class="lightbox" title="Client Files"><img class="dialog" src="images/help/setting-up/system-installation/client-files.png" /></a>
						<div class="caption">Client Files</div>
					</div>
				</li>
				<li>
					<h3>Move web client files</h3>
					<p>Move the contents of the "<%= application.name.toLowerCase() %>" folder (not the "<%= application.name.toLowerCase() %>" folder itself) into the HTML folder of your web server.  On most Unix/Apache systems, the web server folder is usually "/var/www/html". </p>
				</li>
			</ol>
		</li>

		<li>
			<h2><i class="fa fa-server"></i>Install the Web Server Files</h2>
			<p>First, you will need to install the file associated with the web server. The web server is the portion of the application that resides remotely and manages the files and the database. </p>

			<ol>
				<li>
					<h3>Extract web server files</h3>
					<p>Extract the files contained in the file "<%= application.name.toLowerCase() %>-server.zip".  When this file is extracted, it should create a folder named "<%= application.name.toLowerCase() %>-server" which contains a number of sub-folders with names like "app", "bootstrap", config", etc. </p>

					<div class="figure">
						<a href="images/help/setting-up/system-installation/server-files.png" target="_blank" class="lightbox" title="Server Files"><img class="dialog" src="images/help/setting-up/system-installation/server-files.png" /></a>
						<div class="caption">Server Files</div>
					</div>
				</li>
				<li>
					<h3>Move web server files</h3>
					<p>Go to the html directory where the client files are located.  You will see folder such as "scripts", "templates" etc.  Move the "<%= application.name.toLowerCase() %>-server" folder into this folder and rename it "services". </p>

					<div class="figure">
						<a href="images/help/setting-up/system-installation/services-folder.png" target="_blank" class="lightbox" title="Services Folder"><img class="dialog" src="images/help/setting-up/system-installation/services-folder.png" /></a>
						<div class="caption">Services Folder</div>
					</div>
				</li>
				<li>
					<h3>Set storage permissions</h3>
					<p>The web server has a need to sometimes write out temporary files, for example, log files or session files.  It does this in the "services/storage" directory.  Make sure that this directory is writable by your web server. </p>

					<div class="figure">
						<a href="images/help/setting-up/system-installation/storage-folder.png" target="_blank" class="lightbox" title="Services Folder"><img class="dialog" src="images/help/setting-up/system-installation/storage-folder.png" /></a>
						<div class="caption">Storage Folder</div>
					</div>
				</li>
			</ol>
		</li>
	</ol>
</div>
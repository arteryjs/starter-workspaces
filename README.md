# Artery JS --  Docs & Workspaces Starter 

Apologies in advance for the sparcity of these docs. Here's hoping this improves over time.

#### Summary
Under the hood, Artery is just a simple Node/Express.js webserver.  There are a few packaged NPM modules that give it extra powers.  

 - **artery-data-git** reads and writes the /data directory as a tree of flat .json files. This lets you version your content right alongside your markup & styles. Adding data-property="title" to your markup will cause that element to become editable.  When a button or other element with data-save-doc is clicked, it will update the json file and create a new git commit, recording the editor's name. Ditto for creates and deletions.
 - **artery-routes-docs** plumbs Artery so that /doctype/somedoc renders the content in data/doctype/somedoc.json via the template in views/doctype.jade (Artery uses jade by default but it should be easy to swap out your engine of choice, i.e. Handlebars, etc).  
 - **artery-routes-workspaces** plumbs Artery with unique, clone-able Git repos for multiple projects or other work-space contexts in your application.  So, with the workspaces module, in addition to the above docs routes working, /myproject/doctype/somedoc.json will look in data/workspaces/myproject/doctype/somedoc.json and render it using views/doctype.jade.

#### Setup 

> git clone https://github.com/arteryjs/starter-workspaces.git

> cd starter-workspaces && mkdir -p data/workspaces/default/things && echo '{"name": "default"}' > data/workspaces/default/things/meta.json && cd data/workspaces/default/things && git init . && git add . && git commit -m 'initial commit' && cd ../../../.. 

> Duplicate the env.customize-me file as .env (this copy will be excluded from git commits)

> Then, in the new .env file, add a random SESSION_SECRET and replace your name in LOCAL_USER_NAME & email in LOCAL_USER_EMAIL

> rm -rf .git && git init . && git add . && git commit -m 'initial commit'

> npm install

> npm start
 
#### Using Artery

> **Defaults** are your friend.  Creating a new "content type" is as simple as creating a new folder named with the plural of the content type inside of /data with a default.json file containing an empty JSON object {}.  So to create a widgets content type, we'd just create a folder called data/widgets and then add data/widgets/default.json containing {} (or any valid JSON content you want widgets to have at their birth).


> **Templates** If you wish to view/edit your new content type, create views/newtype.jade. If you wish to have an index/list of this data type, create views/newtypes.jade (plural of the doctype).  You can use **views/page\*.jade** and **views/thing\*.jade** in this repo as reference examples.

#### Disclaimer

Artery is in early development. We'd love for you to try it out and welcome suggestions, feedback and pull requests.  Keep in mind this software is **untested** in production. 


#### Other Modules & Future Plans
 - **artery-accounts** local adds users and social auth 
 - Image and other asset uploads **[mission critical]**
 - Static file generation **[mission critical]** (Artery's primary scaling plan)
 - Static file deployment modules for Amazon S3, rsync, and other hosting options.
 - Alternate datastore modules, high on the list would be Mongooose & REST
 - Memcached-driven alternative for artery-data-git (at present, artery-data-git reads and writes to internal memory which prevents clustering and virtal hosting of the node.js process)


'use strict';

let cssPath = 'css/' ;
let jsPath = 'js/' ;
let images = 'images'

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

let _theme = {


    menu(items, menuClass) {
        items = items || [] ;
        menuClass = menuClass || `class="navbar navbar-default navbar-custom navbar-fixed-top"`;
        let menuItems = (items.map(function(item, index) {
            let html = `<li id="menu-item-${index+1}"><a id="${item.href}" href="#" onclick="return a.setMenuItem({menuItem:'${item.href}'});">${item.label}</a></li>` ;
            return html ;
        }).join('\n')) ;
        return `
    <!-- Navigation -->
    <nav ${menuClass}>
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    Menu <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="index.html">Start Bootstrap</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    ${menuItems}
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>` ; 
    },

    header(params) {
        let menu = this.menu(params.header.menu) ;
        
        let output = ( `
    ${menu}
    <!-- Page Header -->
    <!-- Set your background image for this header on the line below. -->
    
        `) ;
        
        return output ;
    },

    blogItem(params) {
        params.posts = params.posts || [] ;
        if (params.blogid) {

        } else {
            let posts = params.posts.map(function(post) {
                let postDate = post.published[0].substring(0,post.published[0].length - 10) ;
                let summary = post.content[0]._.split('.')[0] ;
                return `
                <div class="post-preview">
                    <a href="${post.link[0].$.href}">
                        <h2 class="post-title">
                            ${post.title}
                        </h2></a>
                        <h4 class="post-subtitle">
                            ${summary}
                        </h4>
                    
                    <p class="post-meta">Posted by <a href="#">${post.author[0].name[0]}</a>  [${post.category[0].$.term}]  ${postDate}</p>
                </div>
                <hr>` ;
            }).join('') ;

            return `
            <div class="blogPosts">
                <div class="blogPostWrap">
                    ${posts}
                </div>
            </div>` ;
        }
    },


    home(params) {
        let blog = (params.blog) ? this.blog(params.blog) : '' ;
        
        return `
        <header class="intro-header" style="background-image: url('${params.img}')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="site-heading">
                        <h1>${params.blog.blogTitle || params.title}</h1>
                        <hr class="small">
                        <span class="subheading">${params.subTitle || ''}</span>
                    </div>
                </div>
            </div>
        </div>
        </header>
                
        <section class="container">
        ${blog}
        </section>`;
    },

    
    footer(params) { 
        let menuItem = params.menuItem ;
        params = params.footer ;
        params = params || {} ;
        
        return (`

        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <ul class="list-inline text-center">
                        <li>
                            <a href="${params.twitter}">
                                <span class="fa-stack fa-lg">
                                    <i class="fa fa-circle fa-stack-2x"></i>
                                    <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="${params.facebook}">
                                <span class="fa-stack fa-lg">
                                    <i class="fa fa-circle fa-stack-2x"></i>
                                    <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="${params.github}">
                                <span class="fa-stack fa-lg">
                                    <i class="fa fa-circle fa-stack-2x"></i>
                                    <i class="fa fa-github fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                    <p class="copyright text-muted">${params.copyright || ''}</p>
                </div>
            </div>
        </div>
        `) ;
    },
    
    fullPage(params) {
        return ( 
            `<p>This is where a full page goes</p>
            <pre>
            ${JSON.stringify(params,null,4)}
            </pre>`) ;
    },
    
    contactus(params) {
        
        return (`
        <header class="intro-header" style="background-image: url('${params.img}')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="site-heading">
                        <h1>${params.title || ''}</h1>
                        <hr class="small">
                        <span class="subheading">${params.subTitle || ''}</span>
                    </div>
                </div>
            </div>
        </div>
        </header>
        <div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <p>${params.content}</p>
                <!-- Contact Form - Enter your email address on line 19 of the mail/contact_me.php file to make this form work. -->
                <!-- WARNING: Some web hosts do not allow emails to be sent through forms to common mail hosts like Gmail or Yahoo. It's recommended that you use a private domain email address! -->
                <!-- NOTE: To use the contact form, your site must be on a live web host with PHP! The form will not work locally! -->
                <form name="sentMessage" id="contactForm" novalidate>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Name</label>
                            <input type="text" class="form-control" placeholder="Name" id="name" required data-validation-required-message="Please enter your name.">
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Email Address</label>
                            <input type="email" class="form-control" placeholder="Email Address" id="email" required data-validation-required-message="Please enter your email address.">
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Phone Number</label>
                            <input type="tel" class="form-control" placeholder="Phone Number" id="phone" required data-validation-required-message="Please enter your phone number.">
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Message</label>
                            <textarea rows="5" class="form-control" placeholder="Message" id="message" required data-validation-required-message="Please enter a message."></textarea>
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <br>
                    <div id="success"></div>
                    <div class="row">
                        <div class="form-group col-xs-12">
                            <button type="submit" class="btn btn-default">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    
        `) ;
        
        
    },

    about(params) {
        return (`
        <header class="intro-header" style="background-image: url('${params.img}')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="site-heading">
                        <h1>${params.title || ''}</h1>
                        <hr class="small">
                        <span class="subheading">${params.subTitle || ''}</span>
                    </div>
                </div>
            </div>
        </div>
        </header>
                
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    ${params.description}
                </div>
            </div>
        </div>

        

        
        `);
    },

    categories(feed){
        let categories = feed[0].category;
        // should add all the categories here
        return categories.map(function(category,index) {
            let separator = (index < 4) ? '&nbsp;|&nbsp;' : '' ;
            if (index < 5) {
                return `<a href="#">${category}</a>${separator}` ;
            }
        }).join('')+'<br><br>' ;
    },

    blog(params) {
        params.posts = params.posts || [] ;
        params.feed = params.feed || [];
        if (params.blogid) {
            let post = params.feed[params.blogid] || params.feed[0] || {} ;
            let postDate = post.published[0].substring(0,post.published[0].length - 10) ;
            return `
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                ${blogEntries}
                <!-- Pager -->
                <ul class="pager">
                    <li class="next">
                        <a href="#">Older Posts &rarr;</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
            ` ;
        } else {
            return this.blogItem({posts: params.feed, blogTitle: params.blogTitle}) ;
        }
    },
    
    page(params) {
        if (params.menuItem === 'home') {
            return this.home(params.home) ;
        } else {
            if (this[params.menuItem] !== undefined) {
                return this[params.menuItem](params[params.menuItem]) ;
            } else {
                return this.fullPage(params[params.menuItem]) ; 
            }
        }
    }

} ; 


var theme = function (conf) {
        cssPath = cssPath || conf.cssPath;
        jsPath = jsPath || conf.jsPath;
        
        return _theme ; 
    }

export { theme } ;
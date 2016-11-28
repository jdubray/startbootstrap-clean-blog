

import { menu } from './menu.component.js' ;

// this function wires the application components 
// to the SAM pattern elements (actions and model updates)
var init = function(components) {
    menu.updates.forEach(function(update) {
        components.updates.push(update) ;
    }) ;

    menu.actions.forEach(function(action) {
        components.actions.push(action) ;
    }) ;
}

var getParameterByName = function(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var checkBackButton = function(model) {
    if (!model.data.popped) { 
        if (model.history){
            let bid = (model.data.home.blog.blogid) ? '-'+model.data.home.blog.blogid : '';
            model.history = {state:model.data.menuItem+bid};
            if (!model.data.home.blog.blogid) { 
                history.pushState(model.history, null, '/html/#'+model.data.menuItem); 
            } else {
                history.pushState(model.history, null, '/html/blog/'+model.data.home.blog.blogid);
            } 
        } else {
            model.history = {state:'home'} ; 
            window.history.pushState(model.history, null, '/html/');
        }
    } 
} ;

var preparePage = function(model) {
    // This section is used to prepare the page for rendering the state representation
    // it is called from the display() function in index.html

    // For instance it can be used to set the body element class

    // if (model.data.blog.blogid || (model.data.menuItem !== 'blog')) { 
    //     document.body.className = 'home' ;
    // } else if (model.data.menuItem === 'blog') { 
    //     document.body.className = 'page page-template' ;
    // } 
} ;

export { init, getParameterByName, preparePage, checkBackButton }
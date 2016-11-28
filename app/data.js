'use strict' ;

const Engine = require('tingodb')() ;
var parseString = require('xml2js').parseString;
var request = require('request');

let site = {} ;

module.exports = function( feedURL, path, domain, collectionName) {
    collectionName = collectionName || "model"
    const db = new Engine.Db(path, {});
    const modeldb = db.collection(collectionName);

    request(feedURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        } else {
            body = `<no_xml></no_xml>` ;
        }
    
        parseString(body, function (err, result) {
            let blogEntries =  [] ;
            let blogHref = "" ;
            let blogAtomHref = "" ;
            let blogTitle = "" ;
            let blogUpdated = "" ;

            if (result.rss) {
                blogEntries = result.rss.channel[0].item ;
                blogHref = result.rss.channel[0]['atom:link'][0].$.href;
                //blogAtomHref = result.feed.link[1].$.href;
                blogTitle = result.rss.channel[0].title[0];
                //blogUpdated = result.feed.updated.split('T')[0] ;

                
            }

            if (result.feed) {
                blogEntries = result.feed.entry;
                // blogHTMLHref = result.feed['link'] ; //[0].$.href;
                // blogAtomHref = result.feed.link ; //[1].$.href;
                blogTitle = result.feed.title[0];
                blogHref = result.feed.link[0].$.href;
                blogUpdated = result.feed.updated[0].split('T') ;
                // posts feed.entry
                // href to html blog  feed.link[0].$.href
                // href to atom feed  feed.link[1].$.href
            }

            console.log('\n'+JSON.stringify(blogEntries));
            

            const model = {
                menuItem : 'home',
                header : { 
                    menu: [ 
                        { active: true, href: "home", label: "Home" }, 
                        { href: "about", label: "About" }, 
                        { href: "contactus", label: "Contact" }  
                    ],
                    facebook: "https://www.facebook.com/",
                    twitter: "https://www.twitter.com",
                    linkedin: "https://www.linkedin.com/"
                },

                footer: {
                    description: "SAM is a new pattern that makes it easy to build beautiful Web Sites",
                    telephone: "+1-800-555-1212",
                    email: "info@yourdomain.com",
                    facebook: "https://www.facebook.com/",
                    twitter: "https://www.twitter.com",
                    intagram: "http://instagram.com/jessie_khoo",
                    pinterest: "http://www.pinterest.com/",
                    linkedin: "https://www.linkedin.com/",
                    subscribe: { size: 20, placeHolder: "Your email", submit: "Subscribe" },
                    copyright: "Copyright © Your Website 2016"
                },
                
                home: {
                    title: "Clean Blog",
                    subTitle: "A Clean Blog Theme by Start Bootstrap",
                    img: "img/home-bg.jpg",
                    blog: {
                        blogTitle: blogTitle,
                        blogHref: blogHref,
                        feed: blogEntries
                    }
                },

                about: {
                    title: "About Me",
                    subTitle: "This is what I do.",
                    img: "img/about-bg.jpg",
                    description: `
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum ullam eveniet pariatur voluptates odit, fuga atque ea nobis sit soluta odio, adipisci quas excepturi maxime quae totam ducimus consectetur?</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum molestiae debitis nobis, quod sapiente qui voluptatum, placeat magni repudiandae accusantium fugit quas labore non rerum possimus, corrupti enim modi! Et.</p>
                    `
                },
                
                contactus: {    
                    title: "Contact Me", 
                    subTitle: "Have questions? I have answers (maybe).",
                    content: "Want to get in touch with me? Fill out the form below to send me a message and I will try to get back to you within 24 hours!", 
                    address: "3600 136th Pl SE #300", 
                    city: "Bellevue, WA 98006", 
                    telephone: "+1-425-298-7823",
                    email: "jdubray@gmail.com",
                    lat: 47.578592, lng:-122.1542519,
                    thankyou: "Thank you! Your message has been received",
                    img: "img/contact-bg.jpg"
                }
            } ;

            let findImages = Promise.all( model.home.blog.feed.map( function(post, index){
                                    return new Promise(function (fulfill, reject) {
                                        try {
                                            parseString(post.content[0]._, function (err, res){
                                                res.p = res.p || {} ;
                                                res.p.a = res.p.a || [] ;
                                                
                                                post.images = res.p.a.map(function(hrf) {
                                                    let hrfs = hrf.$ || {} ;
                                                
                                                    return hrf.$.href || '';
                                                }) ;
                                                if (post.images[0]) {
                                                    fulfill(post.images[0]);
                                                } else {
                                                    fulfill('error at '+index) ;
                                                }
                                                // if (err) reject(err);
                                                // else fulfill(post.images[0]);
                                            });
                                        } catch(error) {
                                            if (post.images === undefined) {
                                                post.images = ["img/post-bg.jpg"];
                                            }
                                            fulfill(post.images[0]) ;
                                        }
                                    })
                                })) ;

            site = model ;

            // modeldb.findOne({domain:domain}, function(err, item) {
            //     item = item || {} ;
            //     if (item.model) {
            //         //site = item.model ;
            //     } else {
            //         modeldb.insert([{domain:domain, model: site}], {w:1}, function(err,result) {}) ;
            //     }
            // })
                            
            
            });
    }) ;
    return function() {
        return site ;
    } ;
}
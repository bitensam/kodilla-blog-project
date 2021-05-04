'use strict';

function titleClickHandler(event) {

    event.preventDefault();

    const clickedElement = this;

    console.log('Link was clicked!');
    console.log(event);



    /* [DONE] remove class 'active' from all article links */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');

}



/* GENERATE TITLE LINKS CONST DECLARATION*/

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

/* Generate Title links function*/

function generateTitleLinks() {

    console.log('Title Links was generated');


    /* [DONE] Remove content of links list in the left column*/

    const titleList = document.querySelector(optTitleListSelector);


    titleList.innerHTML = '';

    console.log('Title list was deleted');


    const titleListElements = document.querySelectorAll('.titles li');

    titleListElements.innerHTML = '';

    console.log('List of elements of class .titles was deleted');

    let html = '';

    /* [DONE] For each article */

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {



        /* [DONE] get article id and assign to const */

        const articleId = article.getAttribute('id');

        console.log(articleId);


        /* [DONE] find title element and assign to const*/

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        console.log(articleTitle);




        /* [in progress] Get the title from the title element*/

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        console.log(linkHTML);

        /* [in progress] create link html code and assign to const */

        titleList.insertAdjacentHTML('beforeend', linkHTML);

        /* [in progress] insert made html code into links list on the left column */


        html = html + linkHTML;

        console.log(html);
    }


    const links = document.querySelectorAll('.titles a');

    console.log(links);

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();
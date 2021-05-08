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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

/* Generate Title links function*/

function generateTitleLinks(customSelector = '') {

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

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector + optArticleSelector);
  for (let article of articles) {



    /* [DONE] get article id and assign to const */

    const articleId = article.getAttribute('id');

    console.log(articleId);


    /* [DONE] find title element and assign to const*/

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    console.log(articleTitle);




    /* [DONE] Get the title from the title element*/

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    console.log(linkHTML);

    /* [DONE] create link html code and assign to const */

    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* [DONE] insert made html code into links list on the left column */


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

function generateTags() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* [DONE] make html variable with empty string */
    let html = '';
    console.log('HTML variable with empty string was made');
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      console.log(tag);
      /* add generated code to html variable */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);
      html = html + linkHTML;
      /* END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  console.log('Tag was clicked!');
  console.log(event);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* remove class active */
    activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let foundTagLink of foundTagLinks) {

    /* add class active */
    foundTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const linkTags = document.querySelectorAll('a[href ^= "#tag-"]');
  /* START LOOP: for each link */
  for (let linkTag of linkTags) {

    /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

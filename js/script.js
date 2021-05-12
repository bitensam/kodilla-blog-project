'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

function titleClickHandler(event) {

  event.preventDefault();

  const clickedElement = this;
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

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

}

/* Generate Title links function*/

function generateTitleLinks(customSelector = '') {

  /* [DONE] Remove content of links list in the left column*/

  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';

  const titleListElements = document.querySelectorAll('.titles li');

  titleListElements.innerHTML = '';

  let html = '';

  /* [DONE] For each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (let article of articles) {

    /* [DONE] get article id and assign to const */

    const articleId = article.getAttribute('id');

    /* [DONE] find title element and assign to const*/

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] Get the title from the title element*/

    /* HANDLEBAR 1*/

    const linkHTMLData = { id: articleId, title: articleTitle };

    const linkHTML = templates.articleLink(linkHTMLData);

    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* [DONE] create link html code and assign to const */

    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* [DONE] insert made html code into links list on the left column */

    html = html + linkHTML;

  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {

    link.addEventListener('click', titleClickHandler);

  }
}

generateTitleLinks();

/* Calculate TAGS PARAMETERS*/

const calculateTagsParams = function (tags) {

  const params = { min: 99999, max: 0 };

  for (let tag in tags) {

    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);

  }
  return params;
};

/* CALCULATE TAG CLASS */

const calculateTagClass = function (count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
};

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {

    /* [DONE] find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */

    for (let tag of articleTagsArray) {

      /* generate HTML of the link */

      /* add generated code to html variable */

      //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* HANDLEBAR 2 */

      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */

      if (!allTags.hasOwnProperty(tag)) {

        /* [NEW] add generated code to allTags object */

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector(optTagsListSelector);

  /*[NEW] calculate number of used tags */

  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] Create variable fo all links html code */

  //let allTagsHTML = '';

  /* HANDLEBAR 4.1 */

  const allTagsData = { tags: [] };

  /*[NEW] START LOOP: for each tag in allTags */

  for (let tag in allTags) {

    /*[NEW] generate code of a link and add it to allTagsHTML*/

    //allTagsHTML += tag + ' (' + allTags[tag] + ')';

    //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';

    /* HANDLEBAR 4.2 */

    allTagsData.tags.push({

      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)

    });

    /*[NEW] END LOOP: for each tag in allTags */
  }

  /*[NEW] add html from allTagsHTML to tagList*/

  //tagList.innerHTML = allTagsHTML;

  /* HANDLEBAR 4.3 */

  tagList.innerHTML = templates.tagCloudLink(allTagsData);

  //tagList.innerHTML = allTags.join(' ');

}
generateTags();

function tagClickHandler(event) {

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

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

/*MODULE 6.2 Authors */

/* Calculate Authors PARAMETERS*/

const calculateAuthorsParams = function (authors) {

  const params = { min: 99999, max: 0 };
  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times');
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);

  }

  return params;
};

function generateAuthors() {

  /* [NEW] create a new variable allAuthors with an empty object */

  let allAuthors = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {


    /* [DONE] find post author wrapper */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get author from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');

    //const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';

    /* HANDLEBAR 3 */

    const linkHTMLData = { id: articleAuthor, title: articleAuthor };

    const linkHTML = templates.authorLink(linkHTMLData);

    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allAuthors */

    if (!allAuthors.hasOwnProperty(articleAuthor)) {

      /* [NEW] add generated code to allTags object */

      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */

  }

  /* [NEW] find list of authors in right column */

  const authorList = document.querySelector(optAuthorsListSelector);

  /*[NEW] calculate number of used tags */

  const authorsParams = calculateAuthorsParams(allAuthors);

  /* [NEW] Create variable to all links html code */

  //let allAuthorsHTML = '';

  /* HANDLEBAR 5.1 */

  const allAuthorsData = { authors: [] };

  /*[NEW] START LOOP: for each author in allAuthors */

  for (let articleAuthor in allAuthors) {

    /*[NEW] generate code of a link and add it to allAuthorsHTML*/
    //allAuthorsHTML += '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '(' + allAuthors[articleAuthor] + ')</a></li >';

    /* HANDLEBAR 5.2 */
    allAuthorsData.authors.push({

      author: articleAuthor,
      count: allAuthors[articleAuthor],

    });

    /*[NEW] END LOOP: for each tag in allAuthors */

  }

  /*[NEW] add html from allTagsHTML to tagList*/

  //authorList.innerHTML = allAuthorsHTML;
  /* HANDLEBAR 5.3 */

  authorList.innerHTML = templates.authorListLink(allAuthorsData);
}

generateAuthors();

/*AUTHOR CLICK HANDLER*/

function authorClickHandler(event) {

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#author-', '');

  /* find all author links with class active */

  const allAuthorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */

  for (let authorActiveLink of allAuthorActiveLinks) {
    /* remove class active */
    authorActiveLink.classList.remove('active');
    /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */

  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */

  for (let foundAuthorLink of foundAuthorLinks) {

    /* add class active */

    foundAuthorLink.classList.add('active');

    /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {

  /* find all links to authors */

  const linkAuthors = document.querySelectorAll('a[href ^= "#author-"]');

  /* START LOOP: for each link */

  for (let linkAuthor of linkAuthors) {

    /* add tagClickHandler as event listener for that link */

    linkAuthor.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */

  }
}

addClickListenersToAuthors();

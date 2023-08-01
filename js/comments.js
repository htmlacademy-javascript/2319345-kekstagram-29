import {renderPack} from './utils.js';

const commentsBlock = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

let onLoaderClick = () => {};

const createComment = ({avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentAvatar = commentElement.querySelector('.social__picture');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const renderComments = (comments) => {
  let commentAmount = 0;
  const renderNextCommentsPack = () => {
    let slicePoint = commentAmount + 5;
    const allCommentsShown = slicePoint >= comments.length;
    slicePoint = allCommentsShown ? comments.length : slicePoint;
    const nextPack = comments.slice(commentAmount, slicePoint);
    renderPack(nextPack, commentsBlock, createComment);
    commentAmount = slicePoint;
    socialCommentCount.innerHTML = `${commentAmount} из <span class="comments-count">${comments.length}</span> комментариев`;
    commentsLoader.hidden = allCommentsShown;
  };

  renderNextCommentsPack();
  onLoaderClick = renderNextCommentsPack;

  commentsLoader.addEventListener('click', onLoaderClick);
};

const clearComments = () => {
  commentsBlock.innerHTML = '';
  commentsLoader.removeEventListener('click', onLoaderClick);
  onLoaderClick = null;
};

export {renderComments, clearComments };

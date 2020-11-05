'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LENGTH} = require(`../../utils/const`);


class CommentService {

  /**
   * @param {Offer} offer
   * @return {Comment[]}
   */
  getAll(offer) {
    return offer.comments;
  }

  /**
   * @param {Offer} offer
   * @param {LocalComment} comment
   * @return {Comment}
   */
  create(offer, comment) {
    const newComment = Object.assign({
      id: nanoid(ID_LENGTH),
    }, comment);
    offer.comments.push(newComment);
    return newComment;
  }

  /**
   * @param {Offer} offer
   * @param {string} commentId
   * @return {Comment|null}
   */
  delete(offer, commentId) {
    const commentToDelete = offer.comments.find((comment) => comment.id === commentId);
    if (!commentToDelete) {
      return null;
    }
    offer.comments = offer.comments.filter((comment) => comment.id !== commentId);
    return commentToDelete;
  }

}


module.exports = CommentService;

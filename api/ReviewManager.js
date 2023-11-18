class ReviewManager {
    constructor(ReviewModel) {
      this.ReviewModel = ReviewModel;
    }
  
    async addReview(reviewData) {
      const newReview = new this.ReviewModel(reviewData);
      return await newReview.save();
    }
  
    async updateReview(reviewId, updatedData) {
      return await this.ReviewModel.findByIdAndUpdate(reviewId, updatedData, { new: true });
    }
  
    async deleteReview(reviewId) {
      return await this.ReviewModel.findByIdAndDelete(reviewId);
    }
  }
  
  module.exports = ReviewManager;
  
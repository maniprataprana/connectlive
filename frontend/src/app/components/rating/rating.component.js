export const ShowRatingComponent = {

	template: `<span class="rating" ng-bind-html=$ctrl.ratingHtml></span>`,

	bindings: {
		rating: '@',
	},

	controller: class ShowRatingComponent {

		constructor() {
			'ngInject';

		}

		$onInit() {
					
			let integerNumber = parseInt(this.rating);
			let decimalPlace = this.rating.split('.')[1];
			let decimalNumber = decimalPlace ? Number('.' + decimalPlace) : 0;

			this.ratingHtml = '';
			for(let i = 1; i <= 5 ; i++) {
				if(i <= integerNumber) {
			
					this.ratingHtml += '<i class="fa fa-star"></i>';
				
				} else if(i === (integerNumber + 1) && decimalNumber && decimalNumber <= 0.5) {

					this.ratingHtml += '<i class="fa fa-star-half-o"></i>';
				
				}	else {

					this.ratingHtml += '<i class="fa fa-star-o"></i>';
				
				}

			} // end of for

		} // end of $onInit() 

	} // end of controller class

} // end of component

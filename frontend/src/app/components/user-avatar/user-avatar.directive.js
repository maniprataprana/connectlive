
export class UserAvatar {

  constructor() {
    'ngInject';

    this.restrict = 'A';
  }

  link($scope, $element, $attrs) {  
    var defaultImage = '/images/default-user.png';
    var validImageSizes = ['small', 'medium', 'large', 'xlarge'];
    var imageSize = 'small';
    if ($attrs.size && validImageSizes.indexOf($attrs.size) !== -1)
      imageSize = $attrs.size;

    $element.addClass(`user-avatar user-avatar--${imageSize}`);
    $attrs.$observe('ngSrc', function(value) {
      if(!value) {
        $element.attr('src', defaultImage);
      }
    });
  }

}
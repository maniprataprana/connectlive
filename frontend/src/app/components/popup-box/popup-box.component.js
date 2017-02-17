
function findDimensions(obj) {
  let dimensions = [];
  dimensions.height = obj.offsetHeight;
  dimensions.width = obj.offsetWidth;
  // offsetLeft & offsetTop are relative to the nearest parent. So this does not
  // guarantee the absolute left & top values from the root(html). To calculate
  // the right dimensions starting from the root html, we traverse back to each 
  // parent & keep on adding their left & top values until we reach the root parent. 
  let curleft = 0;
  let curtop = 0;
  if (obj.offsetParent) {
    do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;  
    } while (obj = obj.offsetParent);
  }        
  dimensions.left = curleft;
  dimensions.top = curtop;
  return dimensions;
}


export const PopupBoxComponent = {

  bindings: {
    left: '@',
    top: '@',
    cue: '@'
  },

  transclude: true,
  template: `
    <div class="popup-box">
      <span class="popup-box__cue"></span>
      <ng-transclude></ng-transclude>
    </div>
  `,

  controller: class PopupBoxComponent {

    constructor($element) {
      'ngInject';
      
      // refers to the DOM component element 
      this.$element = $element;

      // need to capture all elements
      this.componentElement = null;
      this.targetElement = null;
      this.popupElement = null;
      this.cueElement = null;

      // popup can be placed, if we get these element's dimensions.
      this.targetDimensions = null;
      this.popupDimensions = null;
      
      // store the same reference of togglePopup with the correct bounded 'this' to
      // register/remove to any event listener later.       
      this.boundTogglePopup = this.togglePopup.bind(this);
    }   

    $postLink() {
      // get all the elements
      this.componentElement = this.$element[0];
      this.targetElement = this.componentElement.parentElement;

      this.popupElement = this.componentElement.children[0];
      this.cueElement = this.popupElement.children[0];

      // For the popup, where to place the cue?
      let validCuePositions = ['left', 'center', 'right']; 
      if(validCuePositions.indexOf(this.cue) === -1)
        this.cue = 'center';

      // make the popup box to toggle on/off.
      // setting display property in css file shows the popup only on 2nd click.
      // setting it here works;
      this.popupElement.style.display = 'none';
      this.targetElement.addEventListener('click', this.boundTogglePopup);

    } // end of $postLink

    togglePopup() {
      if(this.popupElement.style.display === 'none') {
        this.popupElement.style.display = 'block';
        this.calculatePositions();
      } else {
        this.popupElement.style.display = 'none';
      }
    }

    calculatePositions() {
      this.targetDimensions = findDimensions(this.targetElement);
      this.popupDimensions = findDimensions(this.popupElement);

      this.popupElement.style.left = this.targetDimensions.left + (Number(this.left) || 0 ) + 'px';
      this.popupElement.style.top = this.targetDimensions.top + this.targetDimensions.height + (Number(this.top) || 0 ) + 'px';    

      if (this.cue === 'left')
          this.cueElement.style.left = '20px';
        if (this.cue === 'right')
          this.cueElement.style.left = this.popupDimensions.width - 35 + 'px';
        if (this.cue === 'center')
          this.cueElement.style.left = (this.popupDimensions.width/2) - 5 + 'px';        
    }

    $onDestroy() {
      // cleanup event listeners
      this.targetElement.removeEventListener('click', this.boundTogglePopup);
      // console.log('deleting popup component instance..');
    }
  } // end of controller

} 

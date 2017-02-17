const expertList = [
    { _id: 1, 
      name: 'Harris Baweja',
      image: '/images/faces/1.jpg', 
      smallBio: 'Creative Evangelist', 
      tags: ['business', 'consulting'], 
      reviews:100, 
      rating: 3.5
    },
    { _id: 2, 
      name: 'Antony Bakshi',
      image: '/images/faces/2.jpg', 
      smallBio: 'Life Coach. Trainer. Confidante. Writer by choice. Poet by chance and living happily.', 
      tags: ['philosophy', 'counselling', 'public speaking'], 
      reviews:5, 
      rating: 1.5
    },
    { _id: 3, 
      name: 'Paul Mallya',
      image: '/images/faces/6.jpg', 
      smallBio: 'I run one of the loved magical shows "the magical".', 
      tags: ['magic', 'hat tricks', 'ball game'], 
      reviews:50, 
      rating: 2
    },
    { _id: 1, 
      name: 'Harris Baweja',
      image: '/images/faces/1.jpg', 
      smallBio: 'Creative Evangelist', 
      tags: ['business', 'consulting'], 
      reviews:0, 
      rating: 3
    },
    { _id: 2, 
      name: 'Antony Bakshi',
      image: '/images/faces/2.jpg', 
      smallBio: 'Life Coach. Trainer. Confidante. Writer by choice. Poet by chance and living happily.', 
      tags: ['philosophy', 'counselling', 'public speaking'], 
      reviews:5, 
      rating: 5
    },
    { _id: 3, 
      name: 'Paul Mallya',
      image: '/images/faces/6.jpg', 
      smallBio: 'I run one of the loved magical shows "the magical".', 
      tags: ['magic', 'hat tricks', 'ball game'], 
      reviews:5, 
      rating: 4.5
    },
  ];



export class ExpertService {


  constructor($q) {
    'ngInject';
    this.$q = $q;
  }

  getExpertList() {
    let defer = this.$q.defer();  
    setTimeout(()=> {
      return defer.resolve(expertList);
    }, 2000);
    return defer.promise;
  }
};
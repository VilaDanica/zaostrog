class Gallery {

  constructor () {
    
    this.openImgIndx = null;
    
    this.imgs = document.querySelectorAll('.gallery__img');
    this.gallery = document.querySelector('.gallery-open');
    this.openImg = document.querySelector('.gallery-open__img');
    this.nextBtn = document.querySelector('.gallery-open__btn--next');
    this.previousBtn = document.querySelector('.gallery-open__btn--previous');
    
    this.init();
  }

  init() { 
    this.imgs.forEach( (img, indx) => {
      img.addEventListener('click', () => {
        this.changeImg(indx);
        this.openGallery();
      } );
    } );
    this.gallery.addEventListener('click', () => this.closeGallery());
    this.openImg.addEventListener('click', e => e.stopPropagation());
    this.nextBtn.addEventListener('click', e => this.handleBtnClick(e, 'next'));
    this.previousBtn.addEventListener('click', e => this.handleBtnClick(e, 'previous'));
    document.addEventListener('keydown', e => this.handleArrowKeys(e));
  }

  openGallery() {
    this.gallery.classList.remove('d-none');
  }

  closeGallery() {
    this.gallery.classList.add('d-none');
    this.openImgIndx = null;
  }

  handleBtnClick(evt, action) {
    evt.stopPropagation();
    const indx = this.getNewIndx(action);
    this.changeImg(indx);
  }

  handleArrowKeys(e) {
    if (!this.openImgIndx) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const indx = this.getNewIndx(e.key === 'ArrowRight' ? 'next' : 'previous');
    this.changeImg(indx);
  }

  getNewIndx(action) {
    const { openImgIndx, imgs } = this;
    const lastImg = imgs.length - 1;
    return action === 'next' ?
      (openImgIndx === lastImg ? 0 : openImgIndx + 1) :
      (openImgIndx === 0 ? lastImg : openImgIndx - 1);
  }
  
  changeImg(indx) {
    this.openImgIndx = indx;
    const src = this.imgs[indx].getAttribute('src');
    this.openImg.setAttribute('src', src);
  }

};

new Gallery();
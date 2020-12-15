class Modal {
    constructor(options) {
        let defaultOptions = {
            isOpen: () => {},
            isClose: () => {}
        }
        this.options = Object.assign(defaultOptions, options);
        this.isOpen = false;
        this.isClose = false;
        this.modal = document.querySelector('#modal');
        this.fixedBlock = document.querySelectorAll('.fixed-block');
        this.modalItem = false;
        this.elementClick = false;
        this.speed = false;
        this.animation = false;
        this.width = false;
        this.position = false;
        this.zIndex = false;

        this.init();
    }

    init() {
        if (this.modal) {
            document.addEventListener('click', function (event) {
                const clickedElement = event.target.closest('[data-modal-path]');
                const closeModal = event.target.closest('.modal__close');
                this.elementClick = clickedElement;

                if (clickedElement) {
                    const path = clickedElement.dataset.modalPath;
                    this.modalItem = document.querySelector(`[data-modal-target="${path}"]`);
                    this.open();
                }
                if (closeModal && this.isOpen) {
                    this.close();
                }
                if (!event.target.closest('.modal__item') && this.isOpen) {
                    this.close();
                }

            }.bind(this));

            document.addEventListener('keydown', function (event) {
                if (event.keyCode === 27 && this.isOpen) {
                    this.close();
                }
            }.bind(this));

            window.addEventListener('resize', function () {
                this.widthElement();
            }.bind(this));
        }
    }

    open() {
        const animation = this.elementClick.dataset.modalAnimation;
        const speed = this.elementClick.dataset.modalSpeed;
        const width = this.elementClick.dataset.modalWidth;
        const position = this.elementClick.dataset.modalPosition;

        let animationName = ['fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight'];
        let animationShow = animationName[Math.floor(Math.random() * animationName.length)];

        this.speed = Math.abs(parseInt(this.options.speed)) ? Math.abs(parseInt(this.options.speed)) : 500;
        Math.abs(parseInt(speed)) ? this.speed = Math.abs(parseInt(speed)) : this.speed;

        if (this.options.animation === 'random') {
            if (animation) {
                this.animation = animation;
            } else {
                this.animation = animationShow;
            }
        } else if (!this.options.animation) {
            if (animation === 'random') {
                this.animation = animationShow;
            } else {
                this.animation = animation;
            }
        } else {
            this.animation = 'fadeIn';
        }

        this.width = this.options.width ? this.options.width : '600px';
        width ? this.width = width : this.width;

        this.options.position ? this.position = this.options.position : this.position = 'position-center';
        position ? this.position = position : this.position;

        parseInt(this.options.zIndex) ? this.zIndex = parseInt(this.options.zIndex) : 999;

        this.disableScroll();

        this.modal.style.zIndex = this.zIndex;
        this.modal.style.transition = this.speed / 1000 + 's';
        this.modal.classList.add('show');


        if (this.position === 'top') {
            this.modalItem.classList.add('position-top');
        } else if (this.position === 'bottom') {
            this.modalItem.classList.add('position-bottom');
        }

        this.modalItem.style.transition = this.speed / 1000 + 's';
        this.modalItem.classList.add('show');
        this.modalItem.classList.add(this.animation);


        this.widthElement();
        setTimeout(() => {
            this.options.isOpen(this);
            this.isOpen = true;
            this.modalItem.classList.add('animation-show');
        }, this.speed / 1000);
    }

    close() {
        this.modalItem.classList.remove('animation-show');
        this.modalItem.style.transition = `${this.speed / 1000}s`;

        setTimeout(() => {
            this.options.isClose(this);
            this.isOpen = false;
            this.enableScroll();
            this.modalItem.classList.remove(this.animation);
            this.modalItem.classList.remove('show');
        }, this.speed);

        setTimeout(() => {
            this.modal.classList.remove('show');
        }, this.speed / 100);
    }

    widthElement() {
        this.modalItem.style.width = this.width;

        if ((parseInt(this.width) + 100) >= document.body.clientWidth) {
            this.modalItem.style.width = 'auto';
        } else {
            this.modalItem.style.width = this.width;
        }
    }

    disableScroll() {
        const pagePosition = window.scrollY;
        this.lockPadding();
        document.body.classList.add('disable--scroll');
        document.body.dataset.windowPosition = pagePosition;
        document.body.style.top = `-${pagePosition}px`;
    }

    enableScroll() {
        const pagePosition = document.body.dataset.windowPosition;
        this.unlockPadding();
        document.body.classList.remove('disable--scroll');
        document.body.style.top = 'auto';
        window.scroll({
            top: pagePosition,
            left: 0
        });
    }

    lockPadding() {
        let paddingOffset = window.innerWidth - document.body.offsetWidth;
        document.body.style.boxSizing = 'border-box';
        document.body.style.paddingRight = `${paddingOffset}px`;
        this.fixedBlock.forEach(block => {
            block.style.paddingRight = `${paddingOffset}px`;
        });
        document.body.style.paddingRight = `${paddingOffset}px`;
    }

    unlockPadding() {
        document.body.removeAttribute('data-window-position');
        this.fixedBlock.forEach(block => {
            block.style.paddingRight = '0px';
        });
        document.body.style.paddingRight = '0px';
    }
}
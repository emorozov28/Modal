#Modal window

##Usage
<
Download modal
<link rel="stylesheet" href="modal.css">
<script src="modal.js"></script>
> 

##Examples

<
<button data-modal-path="first"></button>

<div class="modal" id="modal">
    <div class="modal__item position-top" data-modal-target="first">
        <button class="modal__close" aria-label="close modal"></button>
        <h3 class="modal__title">Modal 1</h3>
        <div class="modal__content"></div>
    </div>
</div>


<script src="modal.js"></script>
<script>
    new Modal({
        isOpen: (modal) => {
            console.log(modal);
        },
        isClose: () => {
            console.log('Close');
        },
        speed: 500,
        animation: 'random',
        width: '1000px',
        position: 'bottom',
        zIndex: 1000
    });
</script>
>

##Or:

<
<button
    data-modal-path="first" 
    data-modal-speed="700" 
    data-modal-animation="fadeInUp"
    data-modal-width="90%" 
    data-modal-position="top"
>Modal window 1</button>
>
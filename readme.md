# Modal window

## Usage

Download modal
```
<link rel="stylesheet" href="modal.css">
<script src="modal.js"></script>
```

## Examples

```
If the page has elements that have absolute positioning or fixed, you need to add the class **fixed-block**

<div class="fixed-nav" id="fixed-nav">
    <nav class="nav fixed__nav fixed-block">
        ...
    </nav>
</div>


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
```

## Or:
```
<button
    data-modal-path="first" 
    data-modal-animation="fadeInUp"
    data-modal-speed="700" 
    data-modal-width="90%" 
    data-modal-position="top"
>Modal window 1</button>
```

## Animation:
**default** - fadeIn
```

<button data-modal-animation="fadeIn"></button>

new Modal({
    animation: 'fadeInUp',
});

1. fadeIn
2. fadeInUp
3. fadeInDown
4. fadeInLeft
5. fadeInRight
6. random
```

## Speed:
**default** - 500
```
<button data-modal-speed="500"></button>

new Modal({
    animation: 1000,
});
```

## Width:
**default** - 600px
```
<button data-modal-width="1000px"></button>

new Modal({
    width: '75%',
});
```

## Position:
**default** - center
```
<button data-modal-position="center"></button>

new Modal({
    position: 'top%',
});
```

## z-index:
**default** - 999
```
new Modal({
    Zindex: 1000,
});
```

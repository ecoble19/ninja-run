
const Input = {
    space: {
        pressed: false,
        start: null
    }
}

function changeKey(keyCode, pressed) {
    switch(keyCode) {
        // space
        case 'Space' : {
            Input.space.pressed = pressed;
            if(pressed) {
                Input.space.pressed = performance.now();
            }
            break;
        }
    }
}

document.addEventListener('keydown', function(e) { changeKey(e.code, true); e.preventDefault(); });
document.addEventListener('keyup',   function(e) { changeKey(e.code, false); e.preventDefault(); });


export default Input;
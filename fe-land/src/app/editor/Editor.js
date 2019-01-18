export default class Editor {

    replaceInserted(items, callback) {
        console.log(items);
        items.map(item => {
            let newP = document.createElement('p');
            let nodes = getAllTextNodes(item);
            let str = '';
            nodes.forEach(function (node) {
                if (node.textContent !== '' || node.textContent !== '&nbsp;') {
                    str += node.textContent;
                }
            });
            if (str !== '' && str !== '&nbsp;') {
                if (str != false) {
                    newP.innerHTML = str;
                    newP.innerHTML = newP.innerHTML.replace(/&nbsp;/g, ' ');
                    insertAfter(newP, item);
                }
            }
            removeElement(item);
        })
    }

    pasteEvent(selection, root, event) {
        setTimeout(() => {
            let fromWordStyle = root.querySelectorAll('[style*=mso]');
            this.replaceInserted(fromWordStyle);
            let fromWordClass = root.querySelectorAll('[class*=Mso]');
            this.replaceInserted(fromWordClass);
        }, 200);
    }

    elementUnderMouse(event) {
        const pos = this.getPosition(event);
        return document.elementFromPoint(pos.x - window.pageXOffset, pos.y - window.pageYOffset);
    };

    resizeDropped(readerEvent, callback, size) {

        let image = new Image();
        image.src = readerEvent.target.result;

        image.onload = function () {
            let canvas = document.createElement('canvas'),
                max_size = 450,
                width = image.width,
                height = image.height;
            if (width > height) {
                if (width > max_size) {
                    height *= max_size / width;
                    width = max_size;
                }
            } else {
                if (height > max_size) {
                    width *= max_size / height;
                    height = max_size;
                }
            }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);
            callback(canvas.toDataURL('image/png'));
        }// image.onload
    };// mouse.resizeDropped
}

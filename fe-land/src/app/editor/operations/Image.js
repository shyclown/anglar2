import {
    el,
    getParentInRoot,
    insertAfter,
    removeElement
} from "../EditorUtils";
import {
    css,
    texts
} from "../config";

const style = css.imageFigure;

export const imageFigure = (source, caption, root) => {

    let figure = el('figure',style.figure);
    figure.setAttribute('contenteditable', false);

    let figureImage = new Image();
    let figureCaption = el('figcaption',style.figure_text);
    figureCaption.setAttribute('contenteditable', true);
    figureCaption.innerHTML = caption;
    figureImage.src = source;
    figure.className = style.image;
    figure.appendChild(figureImage);
    figure.appendChild(figureCaption);
    //  root.appendChild(figure);

    const createButton = function(oClassBtn, oClassIcon)
    {
        let btn = el('div',oClassBtn);
        let icon = el('i',oClassIcon);
        btn.appendChild(icon);
        figure.appendChild(btn);
        return btn;
    };

    const moveBtn = createButton(style.moveBtn,style.moveIcon);
    const deleteBtn = createButton(style.deleteBtn,style.deleteIcon);

    let placeholder;

    const moveImg = function()
    {
        console.log('move');
        placeholder = imagePlaceholder(root);
        placeholder.follow();
        placeholder.el.appendChild(figure);
        moveBtn.removeEventListener('click',moveImg,false);
        placeholder.el.addEventListener('click',placeImg,false);
    };
    const placeImg = function()
    {
        placeholder.el.removeEventListener('click',placeImg,false);
        moveBtn.addEventListener('click',moveImg,false);
        root.insertBefore(figure, placeholder.el);
        placeholder.remove();
    };

    moveBtn.addEventListener('click',moveImg,false);
    deleteBtn.addEventListener('click',function(){
        removeElement(figure);
    },false);

    return {
        el: figure,
    }
};

export const imagePlaceholder = (root) =>
{
    console.log('placeholder');
    let placeholder = el('div','placeholder');
    placeholder.innerHTML = texts.placeholder;
    let oldPosition = true;

    const followMouse = function(event)
    {
        if(event.target === root){ return false }
        const elementUnder = getParentInRoot(event.target,root);
        const startHeight = (elementUnder.scrollHeight)/3;
        const endHeight = (elementUnder.scrollHeight)*2/3;
        const bounds = elementUnder.getBoundingClientRect();
        const yPositionInElement = event.clientY - bounds.top;
        let newPosition = oldPosition;
        if(yPositionInElement < startHeight){ newPosition = true; }
        else if(yPositionInElement > endHeight){ newPosition = false; }
        if(newPosition !== oldPosition){
            if(newPosition){ elementUnder.parentNode.insertBefore(placeholder,elementUnder); }
            if(!newPosition){ insertAfter(placeholder,elementUnder); }
            oldPosition = newPosition;
        }
        if(!placeholder.parentNode){
            elementUnder.parentNode.insertBefore(placeholder,elementUnder);
        }
    };

    return {
        el: placeholder,
        follow: function(){
            root.addEventListener('mousemove', followMouse, false);
            root.addEventListener('dragover',followMouse,false);
        },
        remove: function(){
            console.log('removePlaceholder');
            root.removeEventListener('mousemove', followMouse, false);
            root.removeEventListener('dragover',followMouse, false);
            removeElement(placeholder);
        }
    }
};

export const attachImageControls = (root) =>
{
    const images = root.getElementsByClassName('image');
    images.map( image =>{
        const src = image.getElementsByTagName('img')[0].src;
        const caption = image.getElementsByTagName('figcaption')[0];
        let captionContent = '';
        if(caption){ captionContent = caption.innerHTML; }
        const newFigure = new imageFigure(src, captionContent, root);
        root.insertBefore(newFigure.el,image);
        removeElement(image);
    })
};

export const removeImageControls = (root) => {
    let images = root.getElementsByClassName('image');
    images.map( image => {
        removeElement(image.getElementsByClassName('deleteBtn')[0]);
        removeElement(image.getElementsByClassName('moveBtn')[0]);
    })
};

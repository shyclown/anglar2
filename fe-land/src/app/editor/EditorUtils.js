/*
* Text Editor
* v. 0.01
*/

import {customTags} from "./config";

export const node = (node, root) => {
    let inEditor = false;
    while(node.parentNode != null || inEditor === false){
        inEditor = (node === root)
    }
    return inEditor;
};

export const el = function( oTag, oClass ){
    const elm = document.createElement( oTag );
    elm.className = oClass;
    return elm;
};

export const createInnerLine = (oText, oTag, oPlacement) => {
    innerLine[oTag.toLowerCase()](oText, oPlacement);
};

export const innerLine = {
    p: function(oText, oPlacement){ oPlacement.appendChild(oText); const br = document.createElement('br'); oPlacement.appendChild(br);},
    h2:function(oText, oPlacement){ oPlacement.appendChild(oText); const br = document.createElement('br'); oPlacement.appendChild(br);},
    ul:function(oText, oPlacement){  const li = document.createElement('li'); li.appendChild(oText); oPlacement.appendChild(li);  },
    ol:function(oText, oPlacement){  const li = document.createElement('li'); li.appendChild(oText); oPlacement.appendChild(li);  },
    code:function(oText, oPlacement){ const line = createCodeLine(oText); oPlacement.appendChild(line);}
};

export const notCustom = (oNode, customTags) =>{
    return customTags.indexOf(oNode.tagName.toUpperCase()) === -1;
};
export const isCustom = (oNode, customTags) =>{
    return !notCustom(oNode, customTags);
};

export const createCodeLine = (oText) => {
    let elm =  document.createElement('div');
    elm.appendChild(oText);
    elm.className = 'code_line';
    return elm;
};

export const createNewTagElement = (oNodes, oTag, oPlacementAfter)=> {
    let oElement = document.createElement(oTag);
    insertAfter(oElement,oPlacementAfter);
    for (let i = 0; i < oNodes.length; i++) {
        createInnerLine(oNodes[i], oTag, oElement);
    }
    return oElement;
};

export const insertAfter = (newNode, referenceNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
export const insertBefore = (newNode, referenceNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode);
export const removeElement = (elm) => elm.parentNode.removeChild(elm);
export const removeNextSibling = (elm) => elm.parentNode.removeChild(elm.nextSibling);
export const inArrayString = (arr, str) => arr.indexOf(str) > -1;
export const deleteAnchorRange = (elm, offset) => deleteRange( elm, offset , elm, elm.length );
export const deleteFocusRange = (elm, offset) => deleteRange( elm, 0 , elm , offset );
export const getFirstTextNode = (elm) => { while(elm.firstChild != null){  elm = elm.firstChild; } return elm; };
export const getLastTextNode = (elm) => { while(elm.lastChild != null){ elm = elm.lastChild; } return elm; };

export const deleteRange = (start, end, startOffset, endOffset) => {
    const range = document.createRange();
    range.setStart(start, startOffset);
    range.setEnd(end, endOffset);
    range.deleteContents();
};

export const isTextNode = (elm) => { return elm.nodeType === 3};

export const hasTextInside = (elm) =>
{
    let found = false;
    if (!elm){ return false; }
    const isEmpty = (elm) => {
        if(!found) {
            if( isTextNode(elm) ){
                found = (elm.textContent !== '')
            }
            else {
                for (let i = 0; i < elm.childNodes.length; i++) {
                    isEmpty(elm.childNodes[i])
                }
            }
        }
    };
    isEmpty(elm);
    return found;
};

export const getPreviousTextSibling = (theElement, root) =>{
    let elm = theElement;
    // BR
    while(elm.previousSibling != null && isOfTag(elm.previousSibling,'br')){
        elm = elm.previousSibling;
    }
    while(
        elm.previousSibling === null &&
        root.firstChild !== elm
    ){
        elm = elm.parentNode;
    }
    if (root.firstChild === elm){ return false; }
    //if( isOfTag(el, 'br') ){ elm = getPreviousTextSibling(el,oRoot); }
    return getLastTextNode(elm.previousSibling);
};

export const getNextTextSibling = (theElement, root, customTags) =>
{
    let elm = theElement;
    while ( elm.nextSibling === null && root.lastChild !== elm ){
        elm = elm.parentNode;
    }


    if (root.lastChild === elm){ return false; }
    // Avoid Custom elements!!!
    while (
        isCustom(getParentInRoot(elm.nextSibling, root), customTags)
    ){
        elm = elm.nextSibling;
    }
    return getFirstTextNode(elm.nextSibling);
};

export const hasDirectSiblingOfTag = (elm, tagName) => ( elm.nextSibling != null && isOfTag( elm.nextSibling, tagName ));
export const isOfTag = (elm, tagName) => ( !isTextNode(elm) && elm.tagName.toUpperCase() === tagName.toUpperCase());

export const newCaretPosition = function(oElement, oOffset) {
    let range = document.createRange();
    range.setStart(oElement, oOffset);
    range.collapse(true);

    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
};

export const getTopEmpty = (elm, root) => {
    if (!isDescendant(elm, root)){
        console.log('error: getTopEmpty - element is not inside root');
        return false;
    } else {
        let found = false;
        let currentNode = elm;
        while(!found && currentNode !== root){
            if(hasTextInside(currentNode.parentNode)){ found = true; break; }
            else{ currentNode = currentNode.parentNode; }
        }
        return (found) ? currentNode : false;
    }
};
export const hasCustomParent = (elm, root, customTags) => {
    while(elm.parentNode !== root){
        if (isCustom(elm.parentNode, customTags)){ return true; }
        if (!elm.parentNode){ return false; } // has not parent in root
        elm = elm.parentNode;
    }
    return false;
};
export const getParentInRoot = (elm, root) => {
    while(elm.parentNode !== root) {
        if (!elm.parentNode){ return false; } // has not parent in root
        elm = elm.parentNode;
    }
    return elm;
};
export const findText = (elm , arr) => {
    isTextNode(elm) ?
        arr.push(elm) :
        Array.from(elm.childNodes).map(ch => findText(ch, arr))
};
export const getAllTextNodes = (elm) => {
    const arr = [];
    findText(elm ,arr);
    return arr;
};
export const getNodesBetweenNodes = function(nodes, startNode, endNode, includingBorder = false){
    let store = false;
    return nodes.filter( node => {
        if(node === startNode){ store = true; return includingBorder }
        if(node === endNode){ store = false; return includingBorder }
        else if(store){ return store; }
    });
};
export const getTextNodesInSelection = function(oSelection){
    const range = oSelection.getRangeAt(0);
    const nodes = getAllTextNodes(range.commonAncestorContainer);
    return getNodesBetweenNodes(nodes, range.startContainer, range.endContainer, true);
};
export const getElementsInSelection = function(range, set_root){
    const root = set_root || range.commonAncestorContainer;
    const start = getParentInRoot(range.startContainer, root);
    const end = getParentInRoot(range.endContainer, root);
    return getNodesBetweenNodes(root.children, start, end, true);
};
export const deleteRangeElements = function(oSelection, oRoot)
{
    const range = oSelection.getRangeAt(0);
    if(range.startContainer === range.endContainer) {
        range.deleteContents()
    } else {
        const oElements = getElementsInSelection(range, oRoot);
        Array.from(oElements).map((elm, i, arr) => {
            if (elm.className && (elm.className === 'code')){ return; }
            if (i === 0){
                deleteAnchorRange(range.startContainer, range.startOffset);
            }
            else if (i === arr.length - 1){
                deleteFocusRange(range.endContainer, range.endOffset);
            }
            else {
                oRoot.removeChild(elm);
            }
        });
    }
};

export const  replaceInserted = (items, callback) => {
    console.log(items);

    Array.from(items).map(item => {
        let paragraph = document.createElement('p');
        let nodes = getAllTextNodes(item);
        let str = '';
        nodes.forEach(function (node) {
            if (node.textContent !== '' || node.textContent !== '&nbsp;') {
                str += node.textContent;
            }
        });
        if (str !== '' && str !== '&nbsp;') {
            if (str !== false) {
                paragraph.innerHTML = str;
                paragraph.innerHTML = paragraph.innerHTML.replace(/&nbsp;/g, ' ');
                insertAfter(paragraph, item);
            }
        }
        removeElement(item);
    })
};

export const pasteEvent = (selection, root, event) => {
    setTimeout(() => {
        let fromWordStyle = root.querySelectorAll('[style*=mso]');
        this.replaceInserted(fromWordStyle);
        let fromWordClass = root.querySelectorAll('[class*=Mso]');
        this.replaceInserted(fromWordClass);
    }, 200);
};

export const elementUnderMouse = (event) =>{
    const pos = this.getPosition(event);
    return document.elementFromPoint(pos.x - window.pageXOffset, pos.y - window.pageYOffset);
};

const resizeLoadedImage = (image, size, callback) => {
    let canvas = document.createElement('canvas'),
        max_size = size,
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
    console.log(canvas);
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    callback( canvas.toDataURL('image/png') );
};

export const resizeDropped = (readerEvent, callback, size = 450) => {
    let image = new Image();
    image.onload = () => resizeLoadedImage(image, size, callback);
    image.src = readerEvent.target.result;
};

export const isDescendant = (oElement, oRoot) => {
    let node = oElement.parentNode;
    while(node != null){
        if (node === oRoot){ return true; }
        node = node.parentNode;
    }
    return false;
};

export const mergeTextnodes = (oSelection, oRoot, oNode, customTags) =>
{
    let oPosition = oNode.length;
    let nextTextNode = getNextTextSibling( oNode, oRoot, customTags);
    oNode.textContent += nextTextNode.textContent;
    nextTextNode.textContent = '';
    newCaretPosition(oNode , oPosition);
    removeElement(getTopEmpty(nextTextNode,oRoot));
};


export const btnEvent = (type, value) => {
    document.execCommand(type,false,value);
};
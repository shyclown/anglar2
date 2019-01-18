/*
* Text Editor
* v. 0.01
*/
const Editor = Editor || {};
Editor.node = function(node, root){
    let inEditor = false;
    while(node.parentNode != null){
        if(node == root){ inEditor = true }

    }
}

export default class EditorUtils{

    constructor(theEditor){ this.editor = theEditor }

}

function callbackEditor(data){ console.log(data);}

const insertAfter = (newNode, referenceNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
const insertBefore = (newNode, referenceNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode);
const removeElement = (el) => el.parentNode.removeChild(el);
const removeNextSibling = (el) => el.parentNode.removeChild(el.nextSibling);
const inArrayString = (arr, str) => arr.indexOf(str) > -1;
const deleteAnchorRange = (el, offset) => deleteRange( el, offset , el , el.length );
const deleteFocusRange = (el, offset) => deleteRange( el, 0 , el , offset );
const getFirstTextNode = (el) => { while(el.firstChild != null){  el = el.firstChild; } return el; };
const getLastTextNode = (el) => { while(el.lastChild != null){ el = el.lastChild; } return el; };
const deleteRange = (start, end, startOffset, endOffset) => {
    const range = document.createRange();
    range.setStart(start, startOffset);
    range.setEnd(end, endOffset);
    range.deleteContents();
};
const isTextNode = (el) => el.nodeType === 3;
const hasTextInside = (el) =>{
    let found = false;
    if(!el){ return false; }
    const isEmpty = (el) => {
        if(!found) {
            isTextNode(el) ?
                found = (el.textContent !== '') :
                el.childNodes.map(ch => isEmpty(ch))
        }
    };
    isEmpty(el);
    return found;
};
const getPreviousTextSibling = (theElement, root) =>
{
    let el = theElement;
    // BR
    while(el.previousSibling != null && isOfTag(el.previousSibling,'br')){
        el = el.previousSibling;
    }
    // FIRST
    while(el.previousSibling === null && root.firstChild !== el){ el = el.parentNode; }
    if(root.firstChild === el){ return false; }
    //if( isOfTag(el, 'br') ){ el = getPreviousTextSibling(el,oRoot); }
    return getLastTextNode(el.previousSibling);
};
const getNextTextSibling = (theElement, root) =>
{
    let el = theElement;
    while(el.nextSibling === null && root.lastChild !== el){
        el = el.parentNode;
    }
    if(root.lastChild === el){ return false; }
    // Avoid Custom elements!!!
    while(Editor.isCustom(getParentInRoot(el.nextSibling, root))){ el = el.nextSibling; }
    return getFirstTextNode(el.nextSibling);
};
const hasDirectSiblingOfTag = (el, tagName) => ( el.nextSibling != null && isOfTag( el.nextSibling, tagName ));
const isOfTag = (el, tagName) => ( !isTextNode(el) && el.tagName.toUpperCase() === tagName.toUpperCase());
const newCaretPosition = function(oSelection, oElement, oOffset)
{
    let range = document.createRange();
    range.setStart(oElement, oOffset);
    range.collapse(true);
    oSelection.removeAllRanges();
    oSelection.addRange(range);
};
const getTopEmpty = (el, root) => {
    if(!Editor.isDescendant(el, root)){
        console.log('error: getTopEmpty - element is not inside root');
        return false;
    } else {
        let found = false;
        let currentNode = el;
        while(!found && currentNode !== root){
            if(hasTextInside(currentNode.parentNode)){ found = true; break; }
            else{ currentNode = currentNode.parentNode; }
        }
        return (found) ? currentNode : false;
    }
};
const hasCustomParent = (el, root) => {
    while(el.parentNode !== root){
        if(Editor.isCustom(el.parentNode)){ return true; }
        if(!el.parentNode){ return false; } // has not parent in root
        el = el.parentNode;
    }
    return false;
};
const getParentInRoot = (el, root) => {
    while(el.parentNode !== root ) {
        if(!el.parentNode){ return false; } // has not parent in root
        el = el.parentNode;
    }
    return el;
};
const findText = (el , arr) => {
    isTextNode(el) ?
        arr.push(el) :
        el.childNodes.map(ch => findText(ch, arr))
};
const getAllTextNodes = (el) => {
    const arr = [];
    findText(el ,arr);
    return arr;
};
const getNodesBetweenNodes = function(nodes, startNode, endNode, includingBorder = false){
    let store = false;
    return nodes.filter( node => {
        if(node === startNode){ store = true; return includingBorder }
        if(node === endNode){ store = false; return includingBorder }
        else if(store){ return store; }
    });
};
const getTextNodesInSelection = function(oSelection){
    const range = oSelection.getRangeAt(0);
    const nodes = getAllTextNodes(range.commonAncestorContainer);
    return getNodesBetweenNodes(nodes, range.startContainer, range.endContainer, true);
};
const getElementsInSelection = function(range, set_root){
    const root = set_root || range.commonAncestorContainer;
    const start = getParentInRoot(range.startContainer, root);
    const end = getParentInRoot(range.endContainer, root);
    return getNodesBetweenNodes(root.children, start, end, true);
};
const deleteRangeElements = function(oSelection, oRoot)
{
    const range = oSelection.getRangeAt(0);
    if(range.startContainer === range.endContainer) {
        range.deleteContents()
    } else {
        const oElements = getElementsInSelection(range, oRoot);
        oElements.map((el, i, arr) => {
            if (el.className && (el.className === 'code')){ return; }
            if (i === 0){
                deleteAnchorRange(range.startContainer, range.startOffset);
            }
            else if (i === arr.length - 1){
                deleteFocusRange(range.endContainer, range.endOffset);
            }
            else {
                oRoot.removeChild(el);
            }
        });
    }
};

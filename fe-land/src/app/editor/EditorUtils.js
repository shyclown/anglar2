/*
* Text Editor
* v. 0.01
*/
const Editor = Editor || {};
Editor.node = function(node, root){
    let inEditor = false;
    while(node.parentNode != null){
        if(node === root){ inEditor = true }

    }
};

export const el = function( oTag, oClass ){
    const el = document.createElement( oTag );
    el.className = oClass;
    return el;
};

/* TODO */
export const createInnerLine = (oText,oTag, oPlacement) => {
    innerLine[oTag.toLowerCase()].bind(this, oText, oPlacement)();
};

export const innerLine = {
    p: function(oText, oPlacement){ oPlacement.appendChild(oText); const br = document.createElement('br'); oPlacement.appendChild(br);},
    h2:function(oText, oPlacement){ oPlacement.appendChild(oText); const br = document.createElement('br'); oPlacement.appendChild(br);},
    ul:function(oText, oPlacement){  const li = document.createElement('li'); li.appendChild(oText); oPlacement.appendChild(li);  },
    ol:function(oText, oPlacement){  const li = document.createElement('li'); li.appendChild(oText); oPlacement.appendChild(li);  },
    code:function(oText, oPlacement){ const line = createCodeline(oText); oPlacement.appendChild(line);}
};

export const notCustom = (oNode, customTags) =>{
    return customTags.indexOf(oNode.tagName.toUpperCase()) === -1;
};
export const isCustom = (oNode, customTags) =>{
    return !notCustom(oNode, customTags);
};

export const createCodeline = function(oText)
{
    var el =  document.createElement('div');
    el.appendChild(oText);
    el.className = 'code_line';
    return el;
};



export const createNewTagElement = (oNodes,oTag,oPlacementAfter)=> {
    let oElement = document.createElement(oTag);
    insertAfter(oElement,oPlacementAfter);
    for (var i = 0; i < oNodes.length; i++) {
        this.createInnerLine(oNodes[i], oTag, oElement);
    }
    return oElement;
};

export const insertAfter = (newNode, referenceNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
export const insertBefore = (newNode, referenceNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode);
export const removeElement = (el) => el.parentNode.removeChild(el);
export const removeNextSibling = (el) => el.parentNode.removeChild(el.nextSibling);
export const inArrayString = (arr, str) => arr.indexOf(str) > -1;
export const deleteAnchorRange = (el, offset) => deleteRange( el, offset , el , el.length );
export const deleteFocusRange = (el, offset) => deleteRange( el, 0 , el , offset );
export const getFirstTextNode = (el) => { while(el.firstChild != null){  el = el.firstChild; } return el; };
export const getLastTextNode = (el) => { while(el.lastChild != null){ el = el.lastChild; } return el; };
export const deleteRange = (start, end, startOffset, endOffset) => {
    const range = document.createRange();
    range.setStart(start, startOffset);
    range.setEnd(end, endOffset);
    range.deleteContents();
};
export const isTextNode = (el) => el.nodeType === 3;
export const hasTextInside = (el) =>{
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
export const getPreviousTextSibling = (theElement, root) =>{
    let el = theElement;
    // BR
    while(el.previousSibling != null && isOfTag(el.previousSibling,'br')){
        el = el.previousSibling;
    }
    while(el.previousSibling === null && root.firstChild !== el){ el = el.parentNode; }
    if(root.firstChild === el){ return false; }
    //if( isOfTag(el, 'br') ){ el = getPreviousTextSibling(el,oRoot); }
    return getLastTextNode(el.previousSibling);
};
export const getNextTextSibling = (theElement, root) =>
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
export const hasDirectSiblingOfTag = (el, tagName) => ( el.nextSibling != null && isOfTag( el.nextSibling, tagName ));
export const isOfTag = (el, tagName) => ( !isTextNode(el) && el.tagName.toUpperCase() === tagName.toUpperCase());
export const newCaretPosition = function(oSelection, oElement, oOffset)
{
    let range = document.createRange();
    range.setStart(oElement, oOffset);
    range.collapse(true);
    oSelection.removeAllRanges();
    oSelection.addRange(range);
};
export const getTopEmpty = (el, root) => {
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
export const hasCustomParent = (el, root, customTags) => {
    while(el.parentNode !== root){
        if(isCustom(el.parentNode, customTags)){ return true; }
        if(!el.parentNode){ return false; } // has not parent in root
        el = el.parentNode;
    }
    return false;
};
export const getParentInRoot = (el, root) => {
    while(el.parentNode !== root ) {
        if(!el.parentNode){ return false; } // has not parent in root
        el = el.parentNode;
    }
    return el;
};
export const findText = (el , arr) => {
    isTextNode(el) ?
        arr.push(el) :
        el.childNodes.map(ch => findText(ch, arr))
};
export const getAllTextNodes = (el) => {
    const arr = [];
    findText(el ,arr);
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

export const  replaceInserted = (items, callback) => {
    console.log(items);
    items.map(item => {
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

export const resizeDropped = (readerEvent, callback, size) => {

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


export const splitSelection = function(oRoot, customTags)
{
    const oSelection = document.getSelection();
    const oRange = oSelection.getRangeAt(0);
    let startOffset = oRange.startOffset;
    let endOffset = oRange.endOffset;

    let startNode = oRange.startContainer;
    let endNode = oRange.endContainer;

    let changeStartNode;
    let changeEndNode;

    if(!isTextNode(startNode)){
        if(startNode === oRoot){
            startNode = oRoot.children[startOffset - 1];
        }
        if(isCustom(startNode, customTags)){
            startNode = getNextTextSibling(startNode, oRoot);
            startOffset = 0;
        }
    }

    if(!isTextNode(endNode)){
        if(endNode === oRoot){
            endNode = oRoot.children[endOffset - 1];
        }
        if(this.isCustom(endNode)){
            endNode = getPreviousTextSibling(startNode, oRoot);
            endOffset = endNode.textContent.length;
        }
    }

    let sameTextNode = startNode === endNode;
    let wholeStart = startOffset === 0;
    let wholeEnd = endOffset === endNode.textContent.length;
    let wholeContent = wholeStart && wholeEnd;

    if(wholeContent)
    {
        changeStartNode = startNode;
        changeEndNode = endNode;
    }
    if(!wholeContent && sameTextNode){
        endNode = startNode.cloneNode('deep');
        insertAfter(endNode,startNode);
        changeStartNode = startNode.cloneNode('deep');
        insertAfter(changeStartNode,startNode);
        changeStartNode.textContent = changeStartNode.textContent.substr(startOffset, (endOffset - startOffset));
        changeEndNode = changeStartNode;
        startNode.textContent = startNode.textContent.substr(0,startOffset);
        endNode.textContent = endNode.textContent.substr(endOffset);
    }
    if(!wholeContent && !sameTextNode)
    {
        if(wholeStart){
            changeStartNode = startNode;
        }
        else{
            changeStartNode = startNode.cloneNode(true);
            insertAfter(changeStartNode,startNode);
            changeStartNode.textContent = changeStartNode.textContent.substr(startOffset);
            startNode.textContent = startNode.textContent.substr(0,startOffset);
        }
        if(wholeEnd){
            changeEndNode = endNode;
        }
        else{
            changeEndNode = endNode.cloneNode(true);
            insertBefore(changeEndNode, endNode);
            changeEndNode.textContent = changeEndNode.textContent.substr(0, endOffset);
            endNode.textContent = endNode.textContent.substr(endOffset);
        }
    }
    oRange.detach();
    return {
        'startNode': startNode,
        'endNode': endNode,
        'changeStartNode': changeStartNode,
        'changeEndNode': changeEndNode,
        'startOffset': startOffset,
        'endOffset': endOffset
    }
};

export const changeSelectionTag = function(oTag, oRoot, customTags)
{
    const xSelection = splitSelection(oRoot, customTags);
    let changeStartNode = xSelection.changeStartNode;
    let changeEndNode = xSelection.changeEndNode;
    let rootStart = getParentInRoot(changeStartNode,oRoot);
    let rootEnd = getParentInRoot(changeEndNode,oRoot);

    // because of ability editing text in custom elements
    if(isCustom(rootStart, customTags) && rootStart === rootEnd){ return false; }

    let placeNodes = [];
    let placeAfter = rootStart;
    let currentNode = rootStart;
    let controlElement = true;

    while(controlElement) {
        let nextElement = currentNode.nextSibling;

        if(!isCustom(currentNode, customTags)){
            let nodes = getAllTextNodes(currentNode);
            if(currentNode === rootStart || currentNode === rootEnd){
                nodes.map( node => {
                    if(node === changeStartNode){
                        if(placeNodes.length > 0){
                            placeAfter = createNewTagElement(placeNodes,rootStart.tagName,placeAfter);
                        }
                        placeNodes = [];
                        placeNodes.push(node);
                    }
                    if(node === changeEndNode){
                        if(changeEndNode !== changeStartNode){
                            placeNodes.push(node);
                        }
                        placeAfter = createNewTagElement(placeNodes,oTag,placeAfter);
                        placeNodes = [];
                    }
                    if(node !== changeStartNode && node !== changeEndNode){
                        placeNodes.push(node);
                    }
                });

                if(currentNode === rootEnd){
                    if(placeNodes.length > 0){
                        createNewTagElement(placeNodes,rootEnd.tagName,placeAfter);
                        placeNodes = [];
                    }
                    controlElement = false;
                }
            }
            else{
                placeNodes = placeNodes.concat(nodes);
            }
        }

        if(isCustom(currentNode, customTags)){
            if(placeNodes.length > 0){
                createNewTagElement(placeNodes,oTag,placeAfter);
                placeNodes = [];
            }
            if(currentNode === rootEnd){
                controlElement = false;
            }
            placeAfter = nextElement;
        }
        currentNode = nextElement;

    }

    if( rootStart !== rootEnd){
        removeElement(rootEnd);
    }
    removeElement(rootStart);
};


export const isDescendant = (oElement, oRoot) => {
    let node = oElement.parentNode;
    while(node != null){
        if(node === oRoot){ return true; }
        node = node.parentNode;
    }
    return false;
};

export const mergeTextnodes = (oSelection, oRoot, oNode) =>
{
    let oPosition = oNode.length;
    let nextTextNode = getNextTextSibling( oNode, oRoot);
    oNode.textContent += nextTextNode.textContent;
    nextTextNode.textContent = '';
    newCaretPosition(oSelection , oNode , oPosition);
    removeElement(getTopEmpty(nextTextNode,oRoot));
};
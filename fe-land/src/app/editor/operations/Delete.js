import {

    getAllTextNodes, getFirstTextNode,
    getNextTextSibling,
    getParentInRoot,
    getTopEmpty, hasTextInside, isCustom, isDescendant, isOfTag, mergeTextnodes,
    newCaretPosition,
    removeElement, splitSelection
} from "../EditorUtils";

export const deleteEvent = (oSelection, oRoot, customTags) =>
{
    if(!oSelection.isCollapsed) {
        event.preventDefault();
        deleteRange(oRoot);
    }

    else if( oSelection.focusOffset === oSelection.focusNode.length )
    {
        event.preventDefault();
        let oNode = oSelection.focusNode;
        /*
        Issue: There is issue when next element is custom Image,
        We need to make it skip the image solved in next sibling
        */
        if(oNode === oRoot){ return false; }

        const firstNotCustomChild = function(){
            let oElement = oRoot.firstChild;
            while(isCustom(oElement, customTags)){
                oElement = oElement.nextSibling;
            }
            return oElement;
        };

        const lastNotCustomChild = function(){
            let oElement = oRoot.lastChild;
            while(isCustom(oElement, customTags)){
                oElement = oElement.previousSibling;
            }
            return oElement
        };

        const emptyNode = !hasTextInside(oNode);
        const lastNodeInEditor = oNode === firstNotCustomChild() && oNode === lastNotCustomChild();
        const firstTextNode = oNode === getFirstTextNode(oRoot) || oNode === oRoot.firstChild;

        if ( lastNodeInEditor && emptyNode){ return false; }

        if ( oNode.nextSibling != null && isOfTag(oNode.nextSibling, 'br')){
            removeElement(oNode.nextSibling);
            mergeTextnodes(oSelection, oRoot, oNode);
        } else {
            let nextTextNode = getNextTextSibling( oNode, oRoot);
            if( nextTextNode )
            {
                if(nextTextNode.parentNode.tagName === 'A'){
                    oSelection.getRangeAt(0).insertNode(nextTextNode.parentNode);
                }
                else{
                    mergeTextnodes(oSelection, oRoot, oNode);
                }
            }
        }
    }
}




/* Editor.deleteRange
- deltes content of selection excluding custom elements
- does not care about position of custom elements
- @requires Editor.splitSelection(root);
*/
export const deleteRange = (oRoot, customTags) =>
{
    const xSelection = splitSelection(oRoot, customTags);
    const changeStartNode = xSelection.changeStartNode;
    const changeEndNode = xSelection.changeEndNode;
    const startElement = getParentInRoot(changeStartNode, oRoot);
    const endElement = getParentInRoot(changeEndNode, oRoot);

    const sameRootParent = startElement === endElement;

    let deleteElement = true;
    let removeNode = false;
    let currentElement = startElement;

    const clearNode = function(oNode, oRoot){
        oNode.textContent = '';
        let node = getTopEmpty(oNode,oRoot);
        if(node){ removeElement(node) }
    };

    while(deleteElement)
    {
        let nextElement = currentElement.nextSibling;

        if(
            currentElement === startElement ||
            currentElement === endElement
        ){
            let nodes = getAllTextNodes(currentElement);

            nodes.map( node => {
                if(node === changeStartNode){
                    removeNode = true;
                    clearNode(node, oRoot);
                    if(node === changeEndNode){
                        removeNode = false;
                        deleteElement = false;
                    }
                }
                else if(node === changeEndNode){
                    clearNode(node, oRoot);
                    removeNode = false;
                    deleteElement = false;
                }
                else if(removeNode){
                    clearNode(node, oRoot);
                }
            });
            if(!hasTextInside(currentElement) && isDescendant(currentElement, oRoot)){
                removeElement(currentElement); }
        }
        else {
            if(!isCustom(currentElement, customTags) && isDescendant(currentElement, oRoot)){
                removeElement(currentElement);
            }
        }
        currentElement = nextElement;
    }
    if(sameRootParent && changeStartNode !== changeEndNode){
        const xEndNode = xSelection.endNode;
        xSelection.startNode.textContent += xEndNode.textContent;
        clearNode(xEndNode,oRoot);
    }
    // join nodes if same type
    if(!sameRootParent && startElement.tagName === endElement.tagName){
        xSelection.startNode.textContent += xSelection.endNode.textContent;
        clearNode(xSelection.endNode, oRoot);
        newCaretPosition(xSelection, xSelection.startNode, xSelection.startOffset);
    }
};

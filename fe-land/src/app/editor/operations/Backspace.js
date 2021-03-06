import {
    getFirstTextNode, getNextTextSibling,
    getParentInRoot, getPreviousTextSibling, getTopEmpty, hasTextInside,
    isCustom, isOfTag, isTextNode, newCaretPosition, removeElement
} from "../EditorUtils";
import {
    deleteRange
} from "./Delete"

/*
*  Backspace Event
* */
export const backspaceEvent = (oSelection, oRoot, customTags) =>
{
    let oNode = oSelection.focusNode;
    const rootNode = getParentInRoot(oNode,oRoot);
    if (oNode === oRoot){
        event.preventDefault();
        console.log('error: selected node is root node'); return false;
    }
    //-----------------------------------------------------
    // Selection NOT Collapsed
    //-----------------------------------------------------
    if (!oSelection.isCollapsed){
        if(isCustom(rootNode, customTags)){
            console.log('Delete range is inside custom');
        }
        else{
            event.preventDefault();
            deleteRange(oRoot, customTags);
        }
    }
    //-----------------------------------------------------
    // Selection Collapsed
    //-----------------------------------------------------
    else if( oSelection.isCollapsed && oSelection.focusOffset === 0 )
    {
        console.log('Backspace - selection is Collapsed');
        event.preventDefault();
        let oPrevText = getPreviousTextSibling(oNode, oRoot);
        let targetRoot = getParentInRoot(oPrevText, oRoot);
        let sourceRoot = getParentInRoot(oNode, oRoot);
        hasTextInside(sourceRoot);
        let sameRoot = targetRoot === sourceRoot;
        let oPosition = oPrevText.length;
        let emptyNode = !hasTextInside(oNode); //
        let lastNodeInTree = oNode === oRoot.firstChild && oNode === oRoot.lastChild;
        let firstTextNode = oNode === getFirstTextNode(oRoot) || oNode === oRoot.firstChild;

        if (
            isOfTag(rootNode,'code')
            || isOfTag(rootNode,'figure')
            || isOfTag(rootNode, 'ul')
            || isOfTag(rootNode, 'ol'))
        {
            console.log('inside - Custom Root Node');
            if (getFirstTextNode(rootNode) === oNode || isOfTag(oNode, 'figcaption')){
                return false; // nothing to delete
            }
            else{
                oPrevText.textContent += oNode.textContent;
                oNode.textContent = '';
                removeElement(getTopEmpty(oNode, oRoot));
                newCaretPosition(oPrevText, oPosition);
            }
        }

        else if (isCustom(rootNode, customTags)){
            return false;
        }
        //-----------------------------------------------------
        // Default Function when not Custom Elements - Not First or Last Node
        //-----------------------------------------------------
        else{
            if (!hasTextInside(sourceRoot)){
                removeElement(sourceRoot);
                newCaretPosition(oPrevText, oPrevText.length);
                return false;
            }
            if (!hasTextInside(targetRoot)){
                removeElement(targetRoot);
                return false;
            }
            if (!firstTextNode){
                /* Do not move to custom elements */
                if (isCustom(targetRoot, customTags)){
                    return false;
                }
                /* Remove previous BR */
                let oPrevious = oNode.previousSibling;
                if (oPrevious && isOfTag(oPrevious,'br')){
                    removeElement(oPrevious, oRoot);
                    oPosition = oPrevText.textContent.length;
                }
                /* Move A TAG as a Element not just text */
                if (isOfTag(oNode.parentNode, 'a')){
                    oNode = oNode.parentNode;
                }

                //-----------------------------------------------------
                // Same Root Element
                //-----------------------------------------------------
                if (sameRoot){
                    console.log('In Same Root');
                    if (isTextNode(oPrevText) && isTextNode(oNode)){
                        oPrevText.textContent += oNode.textContent;
                        removeElement( oNode );
                    }
                }
                //-----------------------------------------------------
                // Different root Element
                //-----------------------------------------------------
                else {
                    console.log('Different Roots');
                    if (oNode === sourceRoot){
                        // If selected node is root we grab first child
                        oNode = sourceRoot.firstChild;
                    }

                    let prevNode = oPrevText;
                    if (isOfTag(prevNode.parentNode,'a')){
                        prevNode = prevNode.parentNode;
                    }
                    while (oNode){
                        let nextNode = oNode.nextSibling;
                        if (
                            isTextNode(oNode) &&
                            isTextNode(prevNode)
                        ){
                            prevNode.textContent += oNode.textContent;
                            removeElement( oNode );
                        }
                        else if (
                            !isTextNode(oNode) ||
                            !isTextNode(prevNode)
                        ){
                            targetRoot.appendChild(oNode);
                            prevNode = oNode;
                        }
                        oNode = nextNode;
                    }
                    removeElement(getTopEmpty(sourceRoot, oRoot));
                }
                newCaretPosition(oPrevText, oPosition);
            }
            //-----------------------------------------------------
            // First Text Node in Root
            //-----------------------------------------------------
            else if (firstTextNode){
                // if its last node altogether
                if (lastNodeInTree || !emptyNode){ return false; }
                // if its not the last we remove it if empty and move to next
                else if (!lastNodeInTree && emptyNode)
                {
                    newCaretPosition(getNextTextSibling(oNode, oRoot), 0);
                    removeElement( getTopEmpty(oNode, oRoot) );
                }
            }
        } /* end of - Default */
    } /* end of - Selection Collapsed */
};

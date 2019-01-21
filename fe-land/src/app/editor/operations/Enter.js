import {getParentInRoot, isOfTag, newCaretPosition, removeElement} from "../EditorUtils";
export const enterEvent = (oSelection, oRoot, event) =>
{
    const replaceDivIfCreated = function()
    {
        const sel = document.getSelection();
        let node = sel.focusNode;
        let rootNode = getParentInRoot(node, oRoot);
        if(isOfTag(rootNode,'div')){
            let p = document.createElement('p');
            insertBefore(p, rootNode);
            p.innerHTML = rootNode.innerHTML;
            removeElement(rootNode);
            newCaretPosition(p, 0);
        }
    };

    let oNode = oSelection.focusNode;
    let oRootNode = getParentInRoot(oNode, oRoot);
    let lastInRootNode = oNode === oRootNode.lastChild;

    if(isOfTag(oRootNode, 'h2')
        || isOfTag(oRootNode, 'ol')
        || isOfTag(oRootNode, 'ul')
    ){
        if(!oNode.length || oSelection.focusOffset === oNode.length){
            setTimeout(function(){ replaceDivIfCreated(); },0);
        }
    }
};

import {
    createNewTagElement,
    getAllTextNodes,
    getParentInRoot,
    isCustom,
    removeElement
} from "../EditorUtils";
import {
    splitSelection
} from "./splitSelection";

export const changeSelectionTag = function(oTag, oRoot, customTags)
{
    const xSelection = splitSelection(oRoot, customTags);

    let changeStartNode = xSelection.changeStartNode;
    let changeEndNode = xSelection.changeEndNode;
    let rootStart = getParentInRoot(changeStartNode,oRoot);
    let rootEnd = getParentInRoot(changeEndNode,oRoot);

    // because of ability editing text in custom elements
    if (
        isCustom(rootStart, customTags) &&
        rootStart === rootEnd
    ){ return false; }

    let placeNodes = [];
    let placeAfter = rootStart;
    let currentNode = rootStart;
    let controlElement = true;

    while(controlElement) {
        let nextElement = currentNode.nextSibling;

        if(!isCustom(currentNode, customTags)){
            let nodes = getAllTextNodes(currentNode);
            if(currentNode === rootStart || currentNode === rootEnd){
                Array.from(nodes).map( node => {
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

        if (isCustom(currentNode, customTags)){
            if (placeNodes.length > 0){
                createNewTagElement(placeNodes,oTag,placeAfter);
                placeNodes = [];
            }
            if (currentNode === rootEnd){
                controlElement = false;
            }
            placeAfter = nextElement;
        }
        currentNode = nextElement;

    }

    if (rootStart !== rootEnd){
        removeElement(rootEnd);
    }
    removeElement(rootStart);
};
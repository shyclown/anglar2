import {
    getNextTextSibling,
    getPreviousTextSibling,
    insertAfter,
    insertBefore,
    isCustom,
    isTextNode
} from "../EditorUtils";

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

    if (!isTextNode(startNode)) {
        if (startNode === oRoot) {
            startNode = oRoot.children[startOffset - 1];
        }
        if (isCustom(startNode, customTags)) {
            startNode = getNextTextSibling(startNode, oRoot, customTags);
            startOffset = 0;
        }
    }

    if (!isTextNode(endNode)) {
        if (endNode === oRoot) {
            endNode = oRoot.children[endOffset - 1];
        }
        if (isCustom(endNode, customTags)) {
            endNode = getPreviousTextSibling(startNode, oRoot, customTags);
            endOffset = endNode.textContent.length;
        }
    }

    let sameTextNode = startNode === endNode;
    let wholeStart = startOffset === 0;
    let wholeEnd = endOffset === endNode.textContent.length;
    let wholeContent = wholeStart && wholeEnd;

    if (wholeContent){
        changeStartNode = startNode;
        changeEndNode = endNode;
    }
    if (!wholeContent && sameTextNode){
        endNode = startNode.cloneNode(true);
        insertAfter(endNode,startNode);
        changeStartNode = startNode.cloneNode(true);
        insertAfter(changeStartNode,startNode);
        changeStartNode.textContent = changeStartNode.textContent.substr(startOffset, (endOffset - startOffset));
        changeEndNode = changeStartNode;
        startNode.textContent = startNode.textContent.substr(0,startOffset);
        endNode.textContent = endNode.textContent.substr(endOffset);
    }
    if (!wholeContent && !sameTextNode){
        if (wholeStart){
            changeStartNode = startNode;
        }
        else{
            changeStartNode = startNode.cloneNode(true);
            insertAfter(changeStartNode,startNode);
            changeStartNode.textContent = changeStartNode.textContent.substr(startOffset);
            startNode.textContent = startNode.textContent.substr(0,startOffset);
        }
        if (wholeEnd){
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
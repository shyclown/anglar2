import {el, getParentInRoot, insertAfter, isDescendant, pasteEvent, resizeDropped} from "./EditorUtils";
import {imageFigure, imagePlaceholder} from "./operations/Image";
import {ajax} from "./utils/ajax";
import {css, customTags, texts} from "./config";
import {buttons} from "./buttons";

import {backspaceEvent} from "./operations/Backspace";
import {deleteEvent} from "./operations/Delete";
import {enterEvent} from "./operations/Enter";


export default class EditorArea {

    constructor(config) {
        this.checkRequiredConfig(config);
        /* config */
        this.form_id = config && config.form_id;
        this.input_id = config && config.input_id;

        this.upload_file_url = config && config.upload_file_url || '' ;

        /* custom function handling upload */
        this.onImageUpload = config && config.onImageUpload || false;
        this.uploadUrl = config && config.uploadUrl || false;

        /* provided external actions */
        this.dropFileAction = config && config.dropFileAction || false;
        this.dropFileCallback = config && config.dropFileCallback || false;

        this.image_url = config && config.image_url || '';
        this.customDropHandler = config && config.customDropHandler || false;
        // Editor.area
        this.input_el = document.getElementById(this.input_id);
        this.form_el = document.getElementById(this.form_id);

        this.part = this.createParts();
        this.root = this.part.content_wrap;
        this.buttons = this.createAllButtons();
        this.event = this.createEvents();

        this.attachEvents();

        this.placehoderAbove = true;
        this.movingImage = false;
        this.input_el.type = 'hidden';
        this.root.normalize();
    }

    checkRequiredConfig(config){
        ['uploadUrl'].map(v => {
            if(!config[v]){
                console.warn("Missing required config value: "+ v);
            }
        })
    };

    //Editor.attachImageControls.bind(this)();
    attachEvents() {
        this.root.addEventListener('keydown', this.event.keydown, false);
        this.root.addEventListener('copy', this.event.copy, false);
        this.root.addEventListener('paste', this.event.paste, false);
        this.root.addEventListener('cut', this.event.cut, false);
        // Change Mode
        this.part.htmlSwitch.addEventListener('change', this.event.changeMode, false);
        // Mouse Events
        this.root.addEventListener('contextmenu', function () {}, false);

        this.root.addEventListener('dragenter', this.event.dragenter, false);
        this.root.addEventListener('dragleave', removeDefault, false);// def
        this.root.addEventListener('dragstart', removeDefault, false);// def
        this.root.addEventListener('dragend', removeDefault, false);// def
        this.root.addEventListener('dragover', removeDefault, false);// def
        this.root.addEventListener('drag', removeDefault, false);// def
        this.root.addEventListener('drop', this.event.drop, false);
        // Submit
        this.form_el.addEventListener('submit', this.oSubmit.bind(this), false);
    };

    createEvents() {
        let area = this;
        let oSelection = window.getSelection();
        let oRoot = this.root;

        return {
            keydown: function (event) {
                if (event.keyCode === 46) {
                    deleteEvent(oSelection, oRoot, customTags);
                } // delete
                if (event.keyCode === 8) {
                    backspaceEvent(oSelection, oRoot , customTags);
                } // backspace
                if (event.keyCode === 13) {
                    enterEvent(oSelection, oRoot, event);
                } // enter
            },
            copy: function (event) {
                console.log('copy', event);
            },
            paste: function (event) {
                pasteEvent(oSelection, oRoot, event);
            },
            cut: function (event) {
                console.log('cut', event);
            },
            changeMode: function (event) {
                const oContentWrap = area.part.content_wrap;
                let htmlContent;
                if (event.target.checked) {
                    htmlContent = document.createTextNode(oContentWrap.innerHTML);
                    oContentWrap.innerHTML = "";
                    oContentWrap.contentEditable = false;
                    const oPre = document.createElement("pre");
                    oPre.id = "sourceText";
                    oPre.contentEditable = 'true';
                    oPre.appendChild(htmlContent);
                    oContentWrap.appendChild(oPre);
                } else {
                    if (document.all) {
                        oContentWrap.innerHTML = oContentWrap.innerText;
                    } else {
                        htmlContent = document.createRange();
                        htmlContent.selectNodeContents(oContentWrap.firstChild);
                        oContentWrap.innerHTML = htmlContent.toString();
                    }
                    oContentWrap.contentEditable = true;
                }
            },
            dragenter: function (event) {
                console.log('dragenter');
                if (!area.placeholder) {
                    area.placeholder = imagePlaceholder(area.part.content_wrap);
                    console.log(area.placeholder);
                    area.placeholder.follow();
                }
            },
            drop: function (event) {
                removeDefault(event);
                // if provided upload function
                if (area.customDropHandler) {
                    area.customDropHandler(event);
                } else {
                    // default upload function if enabled
                    const data = event.dataTransfer.files;
                    const reader = new FileReader();
                    reader.onload = function (readerEvent) {

                        /* resize image before upload */


                        function callback(resultUrl) {
                            console.log('callback',resultUrl);
                            const oData = {action: 'upload', image: resultUrl};
                            const uploadProgress = function (percent) {
                                console.log(percent * 100);
                            };
                            const callbackAjax = function (imageUrl) {
                                if (!imageUrl){
                                    console.warn('Ajax request callback requires imageUrl.')
                                }else{
                                    area.afterImageUpload(imageUrl, true);
                                }
                            };

                            area.dropFileAction &&  area.dropFileAction(data, callbackAjax);
                            //area.uploadUrl && ajax(area.uploadUrl, oData, uploadProgress, callbackAjax);
                        }

                        resizeDropped(readerEvent, callback,600);
                    };
                    reader.onprogress = function (ev) {
                        console.log(ev.loaded / (ev.total / 100));
                    };
                    reader.readAsDataURL(data[0]);
                }
            }
        }
    }

    createParts() {
        const oInput = this.input_el;
        let part = {};
        part.editor_wrap = el('div', css.parts.editor_main);
        part.buttons_wrap = el('div', css.parts.buttons.wrap);
        part.content_wrap = el('div', css.parts.content.wrap);
        part.htmlSwitch_wrap = el('div', css.parts.html_switch.wrap);
        part.htmlSwitch = el('input', css.parts.html_switch.el);
        part.htmlSwitch_label = el('label', css.parts.html_switch.label);

        part.content_wrap.contentEditable = true;
        part.htmlSwitch.type = 'checkbox';
        part.htmlSwitch.name = 'switchMode';
        part.htmlSwitch_label.setAttribute('for', 'switchMode');
        part.htmlSwitch_label.textContent = texts.htmlSwitch_label;

        part.editor_wrap.appendChild(part.buttons_wrap);
        part.editor_wrap.appendChild(part.content_wrap);
        part.editor_wrap.appendChild(part.htmlSwitch_wrap);
        part.htmlSwitch_wrap.appendChild(part.htmlSwitch);
        part.htmlSwitch_wrap.appendChild(part.htmlSwitch_label);
        // insert
        part.content_wrap.innerHTML = oInput.value;
        oInput.parentNode.insertBefore(part.editor_wrap, oInput);
        return part;
    }

    createAllButtons() {

        let allButtons = buttons(this.root);
        for (let item in allButtons)
        {
            const theButton = allButtons[item];
            const elm = el('button', css.parts.buttons.icon_wrap);
            const iconCss = 'fa fa-' + theButton.fname + ' fa-fw';
            const icon = el('i', iconCss);

            elm.type = 'button';
            elm.title = theButton.nicename;
            const fn = () => {
                this.inEditMode(theButton.btn_event.bind(this));
            };
            elm.addEventListener('click', fn.bind(this), false);
            elm.appendChild(icon);
            this.part.buttons_wrap.appendChild(elm);
            buttons[item] = elm;
        }
        return buttons;
    }

    inEditMode(runFunction) {
        if (!this.part.htmlSwitch.checked) {
            if (runFunction) {
                runFunction();
            }
            return true;
        }
        alert("Uncheck \"Show HTML\".");
        this.root.focus();
        return false;
    }

    oSubmit() {
        return this.inEditMode();
    }

    update_content(newContent) {
        this.root.innerHTML = newContent;
    }

    insertAfterSelection(oElement)
    {
        const oRoot = this.root;
        const oSelection = document.getSelection();
        const oRange = oSelection.getRangeAt(0);
        const oRootTag = oRange.endContainer.parentNode.tagName;
        if (
            isDescendant(oRange.endContainer, oRoot)
        ) {
            if (oRange.endContainer.parentNode.tagName === 'A') {
                insertAfter(oElement, oRange.endContainer.parentNode);
            } else if (oRootTag === 'P' || oRootTag === 'LI') {
                oRange.deleteContents();
                oRange.insertNode(oElement);
            } else {
                const oTarget = getParentInRoot(oRange.endContainer, oRoot);
                let p = document.createElement('p');
                insertAfter(p, oTarget);
                p.appendChild(oElement);
                oElement.addEventListener('click', function () {
                    console.log('click');
                }, false);
            }
        } else {
            // Nothing selected
        }
    };

    removePlaceholder() {
        this.placeholder.remove();
        this.placeholder = void 0;
    };

    afterImageUpload(imageUrl) {
        let figure = imageFigure(imageUrl, 'new item', this.root);
        this.root.insertBefore(figure.el, this.placeholder.el);
        this.removePlaceholder();
    };
}

export const removeDefault = (event) => {
    event.preventDefault();
    event.stopPropagation();
};

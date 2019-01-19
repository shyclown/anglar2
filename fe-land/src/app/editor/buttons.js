import {btnEvent, changeSelectionTag} from "./EditorUtils";

export const buttons = (root) => {
    return {
        Remove_formating: {
            nicename:'Remove_formating',
            fname:'paragraph',
            btn_event: function(){
                changeSelectionTag('p',root);
            }
        },
        Header_H2: {
            nicename:'Header_H2',
            fname:'header',
            btn_event: function(){changeSelectionTag('h2',root);}
        },
        Bold: {
            nicename:'Bold',
            fname:'bold',
            btn_event: function(){btnEvent('bold');}
        },
        Italic: {
            nicename:'Italic',
            fname:'italic',
            btn_event: function(){btnEvent('italic');}
        },
        Underline: {
            nicename:'Underline',
            fname:'underline',
            btn_event: function(){btnEvent('underline');}
        },
        Align_left: {
            nicename:'Align left',
            fname:'align-left',
            btn_event: function(){btnEvent('justifyleft');}
        },
        Align_center: {
            nicename:'Align center',
            fname:'align-center',
            btn_event: function(){btnEvent('justifycenter');}
        },
        Align_right: {
            nicename:'Align right',
            fname:'align-right',
            btn_event:function(){btnEvent('justifyright');}
        },
        Align_full: {
            nicename:'Align full',
            fname:'align-justify',
            btn_event: function(){btnEvent('justifyFull');}
        },
        Numbered_list: {
            nicename:'Numbered list',
            fname:'list-ol',
            btn_event: function(){changeSelectionTag('ol', root)}
        },
        Dotted_list: {
            nicename:'Dotted list',
            fname:'list-ul',
            btn_event: function(){changeSelectionTag('ul', root)}
        },
        Quote:{
            nicename:'Quote',
            fname:'quote-right',
            btn_event: function(){btnEvent('formatblock','BLOCKQUOTE')}
        },
        Hyperlink:{
            nicename:'Hyperlink',
            fname:'link',
            btn_event:function(){
                let sLnk=prompt('Write the URL here','http:\/\/');
                if( sLnk&&
                    sLnk!==''&&
                    sLnk!=='http://'
                ){
                    btnEvent('createlink',sLnk);
                }
            }
        },
        Code: {
            nicename:'Code',
            fname:'code',
            btn_event: function(){ changeSelectionTag('code', root); }
        }
    }
};

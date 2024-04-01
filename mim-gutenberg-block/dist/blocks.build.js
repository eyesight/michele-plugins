!function(e){function t(n){if(l[n])return l[n].exports;var a=l[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var l={};t.m=e,t.c=l,t.d=function(e,l,n){t.o(e,l)||Object.defineProperty(e,l,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var l=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(l,"a",l),l},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t){e.exports=wp.blocks},function(e,t){e.exports=wp.blockEditor},function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=l(3),a=(l.n(n),l(4)),i=(l.n(a),l(5)),r=(l.n(i),l(6)),o=(l.n(r),l(7),l(8)),c=(l.n(o),l(9)),m=(l.n(c),l(10),l(11)),s=(l.n(m),l(12)),p=(l.n(s),l(13)),g=(l.n(p),l(14),l(15));l.n(g)},function(e,t){var __=wp.i18n.__,l=wp.blocks.registerBlockType,n=wp.blockEditor,a=n.RichText;n.getAutosave;l("cgb/block-mim-text",{title:__("text"),icon:"editor-paragraph",category:"common",keywords:[__("mim-text \u2014 CGB Block"),__("text"),__("copy")],attributes:{txt:{type:"string"}},edit:function(e){function t(e){n({txt:e})}var l=e.attributes.txt,n=e.setAttributes;return wp.element.createElement(a,{className:"paragraph content",tagName:"p",placeholder:__("Text"),value:l,onChange:t})},save:function(e){var t=e.attributes.txt;return wp.element.createElement(a.Content,{className:"paragraph content",tagName:"p",placeholder:__("Text"),value:t})}})},function(e,t){var __=wp.i18n.__,l=wp.blocks.registerBlockType,n=wp.blockEditor,a=(n.RichText,n.InspectorControls),i=n.MediaUpload,r=wp.components.TextControl,o=wp.components,c=o.PanelBody,m=o.PanelRow,s=o.FormToggle;l("cgb/block-mim-img",{title:__("Bild unbearbeitbar"),icon:"format-image",category:"common",keywords:[__("mim-img \u2014 CGB Block"),__("CGB Example"),__("create-guten-block")],attributes:{imgUrl:{type:"string",default:"http://placehold.it/300x200"},isFullWidth:{type:"boolean"},text:{type:"string"}},edit:function(e){function t(e){u({imgUrl:e.sizes.full.url})}function l(e){u({text:e})}var n=e.attributes,o=n.isFullWidth,p=n.imgUrl,g=n.text,u=e.setAttributes;return[wp.element.createElement(a,null,wp.element.createElement(c,{title:__("Image size","jsforwpblocks")},wp.element.createElement(m,null,wp.element.createElement("label",{htmlFor:"img-size-form-toggle"},__("Full width","jsforwpblocks")),wp.element.createElement(s,{id:"img-size-form-toggle",label:__("image is full width","jsforwpblocks"),checked:o,onChange:function(){return u({isFullWidth:!o})}}))),wp.element.createElement(c,{title:__("Alt-text","alttxt")},wp.element.createElement(m,null,wp.element.createElement("label",{htmlFor:"high-contrast-form-toggle"}),wp.element.createElement(r,{id:"alt-ext",label:__("alt-text","alttext"),value:g,help:"Text for screenreader. Leave blank when image is just used as decorative",onChange:l})))),wp.element.createElement("figure",{className:o?"image image--full-with":"image image--content-with"},wp.element.createElement(i,{onSelect:t,render:function(e){var t=e.open;return wp.element.createElement("img",{src:p,onClick:t})}}))]},save:function(e){var t=e.attributes,l=t.isFullWidth,n=t.imgUrl,a=t.text;return wp.element.createElement("figure",{className:l?"image image--full-with":"image image--content-with"},wp.element.createElement("img",{src:n,alt:a}))}})},function(e,t){var __=wp.i18n.__,l=wp.blocks.registerBlockType,n=wp.blockEditor,a=n.RichText,i=n.InspectorControls,r=n.MediaUpload,o=wp.components,c=o.PanelBody,m=o.PanelRow,s=(o.FormToggle,o.TextControl);l("cgb/block-mim-img-txt",{title:__("image with text"),icon:"media-spreadsheet",category:"common",keywords:[__("image with text"),__("CGB Example"),__("create-guten-block")],attributes:{imgUrl:{type:"string",default:"http://placehold.it/400x300"},bodyContent:{type:"string"},heading:{type:"string"},text:{type:"string"}},edit:function(e){function t(e){console.log(e),b({imgUrl:e.sizes.full.url})}function l(e){b({bodyContent:e})}function n(e){b({heading:e})}function o(e){b({text:e})}var p=e.attributes,g=p.imgUrl,u=p.bodyContent,d=p.heading,w=p.text,b=e.setAttributes;return[wp.element.createElement(i,null,wp.element.createElement(c,{title:__("Alt-text","alttxt")},wp.element.createElement(m,null,wp.element.createElement("label",{htmlFor:"high-contrast-form-toggle"}),wp.element.createElement(s,{id:"alt-ext",label:__("alt-text","alttext"),value:w,help:"Text for screenreader. Leave blank when image is just used ad",onChange:o})))),wp.element.createElement("div",{class:"content image-with-text"},wp.element.createElement("div",{class:"grid-container image-with-text__container"},wp.element.createElement("figure",{class:"image-with-text__img"},wp.element.createElement(r,{onSelect:t,render:function(e){var t=e.open;return wp.element.createElement("img",{src:g,onClick:t})}})),wp.element.createElement("div",{class:"image-with-text__text"},wp.element.createElement(a,{className:"image-with-text__cat",tagName:"p",placeholder:"title",value:d,onChange:n}),wp.element.createElement(a,{className:"image-with-text__txt",tagName:"p",placeholder:"Enter your text here",value:u,onChange:l}))))]},save:function(e){var t=e.attributes,l=t.bodyContent,n=t.heading,i=t.imgUrl,r=t.text;return wp.element.createElement("div",{class:"content image-with-text"},wp.element.createElement("div",{class:"grid-container image-with-text__container"},wp.element.createElement("figure",{class:"image-with-text__img"},wp.element.createElement("img",{src:i,alt:r})),wp.element.createElement("div",{class:"image-with-text__text"},wp.element.createElement(a.Content,{className:"image-with-text__cat",tagName:"p",placeholder:__("Title"),value:n}),wp.element.createElement(a.Content,{className:"image-with-text__txt",tagName:"p",placeholder:__("Text"),value:l}))))}})},function(e,t){var __=wp.i18n.__,l=wp.blocks.registerBlockType,n=wp.blockEditor,a=n.RichText,i=n.InspectorControls,r=n.MediaUpload,o=wp.components,c=o.PanelBody,m=o.PanelRow,s=o.FormToggle,p=o.TextControl;l("cgb/block-mim-img-title",{title:__("title with image"),icon:"align-left",category:"common",keywords:[__("title with image"),__("CGB Example"),__("create-guten-block")],attributes:{imgUrl:{type:"string",default:"http://placehold.it/400x300"},heading:{type:"string"},text:{type:"string"},isBig:{type:"boolean"}},edit:function(e){function t(e){b({imgUrl:e.sizes.full.url})}function l(e){b({heading:e})}function n(e){b({text:e})}var o=e.attributes,g=o.imgUrl,u=o.heading,d=o.text,w=o.isBig,b=e.setAttributes;return[wp.element.createElement(i,null,wp.element.createElement(c,{title:__("Alt-text","alttxt")},wp.element.createElement(m,null,wp.element.createElement("label",{htmlFor:"high-contrast-form-toggle"}),wp.element.createElement(p,{id:"alt-ext",label:__("alt-text","alttext"),value:d,help:"Text for screenreader. Leave blank when image is just used ad",onChange:n})),wp.element.createElement(m,null,wp.element.createElement("label",{htmlFor:"title-size-form-toggle"},__("Big Title","jsforwpblocks")),wp.element.createElement(s,{id:"title-size-form-toggle",label:__("big title","jsforwpblocks"),checked:w,onChange:function(){return b({isBig:!w})}})))),wp.element.createElement("div",{class:"content title-image"},wp.element.createElement("div",{class:"grid-container title-image__container"},wp.element.createElement("figure",{class:"title-image__image"},wp.element.createElement(r,{onSelect:t,render:function(e){var t=e.open;return wp.element.createElement("img",{src:g,onClick:t})}})),wp.element.createElement("div",{className:w?"title-image__wrapper title-image__wrapper--big":"title-image__wrapper"},wp.element.createElement(a,{className:"title-image__title",tagName:"h2",placeholder:"title",value:u,onChange:l}))))]},save:function(e){var t=e.attributes,l=t.heading,n=t.imgUrl,i=t.text,r=t.isBig;return wp.element.createElement("div",{class:"content title-image"},wp.element.createElement("div",{class:"grid-container title-image__container"},wp.element.createElement("figure",{class:"title-image__image"},wp.element.createElement("img",{src:n,alt:i})),wp.element.createElement("div",{className:r?"title-image__wrapper title-image__wrapper--big":"title-image__wrapper"},wp.element.createElement(a.Content,{className:"title-image__title",tagName:"h2",placeholder:__("Title"),value:l}))))}})},function(e,t,l){"use strict";var n=l(0),a=(l.n(n),l(1)),__=(l.n(a),wp.i18n.__),i=["cgb/block-mim-list-item","cgb/block-mim-list-item-title"];wp.element.createElement(a.InnerBlocks,{allowedBlocks:i}),Object(n.registerBlockType)("cgb/block-mim-list-container",{title:__("list-container inner"),icon:"welcome-write-blog",category:"common",keywords:[__("mim-list-container \u2014 CGB Block"),__("CGB Example"),__("create-guten-block")],getEditWrapperProps:function(){return{"data-align":"full"}},edit:function(e){return wp.element.createElement("div",{className:"list__wrapper"},wp.element.createElement(a.InnerBlocks,{allowedBlocks:i}))},save:function(e){return wp.element.createElement("div",{className:"list__wrapper"},wp.element.createElement(a.InnerBlocks.Content,null))}})},function(e,t){var __=wp.i18n.__,l=wp.blocks.registerBlockType,n=wp.blockEditor,a=n.RichText;n.getAutosave;l("cgb/block-mim-list-item",{title:__("list-item text"),icon:"format-aside",category:"common",keywords:[__("mim-list-item \u2014 CGB Block"),__("list"),__("item")],attributes:{txt:{type:"string"}},edit:function(e){function t(e){n({txt:e})}var l=e.attributes.txt,n=e.setAttributes;return wp.element.createElement(a,{className:"list__item",tagName:"p",placeholder:__("Listitem"),value:l,onChange:t})},save:function(e){var t=e.attributes.txt;return wp.element.createElement(a.Content,{className:"list__item",tagName:"p",placeholder:__("Listitem"),value:t})}})},function(e,t){var __=wp.i18n.__,l=wp.blocks.registerBlockType,n=wp.blockEditor,a=n.RichText;n.getAutosave;l("cgb/block-mim-list-item-title",{title:__("list-item title"),icon:"editor-textcolor",category:"common",keywords:[__("mim-list-item-title \u2014 CGB Block"),__("list"),__("item")],attributes:{txt:{type:"string"}},edit:function(e){function t(e){n({txt:e})}var l=e.attributes.txt,n=e.setAttributes;return wp.element.createElement(a,{className:"list__title",tagName:"h3",placeholder:__("Listitem"),value:l,onChange:t})},save:function(e){var t=e.attributes.txt;return wp.element.createElement(a.Content,{className:"list__title",tagName:"h3",placeholder:__("Listitem"),value:t})}})},function(e,t,l){"use strict";var n=l(0),a=(l.n(n),l(1)),__=(l.n(a),wp.i18n.__),i=["cgb/block-mim-list-container"];wp.element.createElement(a.InnerBlocks,{allowedBlocks:i}),Object(n.registerBlockType)("cgb/block-mim-list-outer-container",{title:__("list-container outer"),icon:"welcome-add-page",category:"common",keywords:[__("list-container outer"),__("CGB Example"),__("create-guten-block")],getEditWrapperProps:function(){return{"data-align":"full"}},edit:function(e){return wp.element.createElement("div",{className:"content list"},wp.element.createElement("div",{className:"grid-container list__container"},wp.element.createElement(a.InnerBlocks,{allowedBlocks:i})))},save:function(e){return wp.element.createElement("div",{className:"content list"},wp.element.createElement("div",{className:"grid-container list__container"},wp.element.createElement(a.InnerBlocks.Content,null)))}})},function(e,t){var __=wp.i18n.__,l=wp.blocks.registerBlockType,n=wp.blockEditor,a=n.RichText;n.getAutosave;l("cgb/block-mim-title-h3",{title:__("title h3"),icon:"shield",category:"common",keywords:[__("mim-title-h3 \u2014 CGB Block"),__("h3"),__("title")],attributes:{txt:{type:"string"}},edit:function(e){function t(e){n({txt:e})}var l=e.attributes.txt,n=e.setAttributes;return wp.element.createElement(a,{className:"title-h3 content",tagName:"h3",placeholder:__("Title"),value:l,onChange:t})},save:function(e){var t=e.attributes.txt;return wp.element.createElement(a.Content,{className:"title-h3 content",tagName:"h3",placeholder:__("Title"),value:t})}})},function(e,t){!function(){function e(e,t){return"core/image"===t?lodash.assign({},e,{attributes:lodash.assign({},e.attributes,{className:{type:"string",default:"image"}})}):e}wp.hooks.addFilter("blocks.registerBlockType","custom-image-class/custom-image-styles",e)}()},function(e,t){var __=wp.i18n.__,l=wp.blocks.registerBlockType,n=wp.blockEditor,a=(n.RichText,n.InspectorControls),i=(n.MediaUpload,wp.components.TextControl),r=wp.components,o=r.PanelBody,c=r.PanelRow,m=r.FormToggle;l("cgb/block-mim-video",{title:__("Video Youtube/Vimeo"),icon:"format-image",category:"common",keywords:[__("mim-video \u2014 CGB Block"),__("CGB Example"),__("create-guten-block")],attributes:{videoUrl:{type:"string"},isFullWidth:{type:"boolean"},text:{type:"string"}},edit:function(e){function t(e){s({videoUrl:e})}var l=e.attributes,n=l.isFullWidth,r=l.videoUrl,s=e.setAttributes,p={__html:r};return[wp.element.createElement(a,null,wp.element.createElement(o,{title:__("Image size","jsforwpblocks")},wp.element.createElement(c,null,wp.element.createElement("label",{htmlFor:"img-size-form-toggle"},__("Full width","jsforwpblocks")),wp.element.createElement(m,{id:"img-size-form-toggle",label:__("image is full width","jsforwpblocks"),checked:n,onChange:function(){return s({isFullWidth:!n})}}))),wp.element.createElement(o,{title:__("Url","videoUrl")},wp.element.createElement(c,null,wp.element.createElement("label",{htmlFor:"title-size-form-toggle"}),wp.element.createElement(i,{id:"title-size-form-toggle",label:__("iFrame Code","jsforwpblocks"),value:r,help:"Teilen und dabei Einbetten w\xe4hlen und alles kopieren",onChange:t})))),wp.element.createElement("div",{className:n?"embedVideo embedVideo--full-with":"embedVideo",dangerouslySetInnerHTML:p})]},save:function(e){var t=e.attributes,l=t.isFullWidth,n=t.videoUrl,a={__html:n};return wp.element.createElement("div",{className:l?"embedVideo embedVideo--full-with":"embedVideo",dangerouslySetInnerHTML:a})}})},function(e,t,l){"use strict";var n=l(0),a=(l.n(n),l(1)),__=(l.n(a),wp.i18n.__),i=wp.components.ToggleControl,r=["cgb/block-mim-img-sizes"];Object(n.registerBlockType)("cgb/block-mim-image-container",{title:__("Bild-Container"),icon:"welcome-add-page",category:"common",keywords:[__("image-container")],attributes:{addClassName:{type:"boolean",default:!1}},getEditWrapperProps:function(){return{"data-align":"full"}},edit:function(e){var t=e.attributes,l=e.setAttributes,n=t.addClassName;return wp.element.createElement("div",{className:"content"},wp.element.createElement(i,{label:__("Abstand zwischen Bilder"),checked:n,onChange:function(){return l({addClassName:!n})}}),wp.element.createElement("div",{className:"grid-container image-container"+(n?" image-container--space-between":"")},wp.element.createElement(a.InnerBlocks,{allowedBlocks:r})))},save:function(e){var t=e.attributes,l=t.addClassName;return wp.element.createElement("div",{className:"content"},wp.element.createElement("div",{className:"grid-container image-container"+(l?" image-container--space-between":"")},wp.element.createElement(a.InnerBlocks.Content,null)))}})},function(e,t){var __=wp.i18n.__,l=wp.blocks.registerBlockType,n=wp.blockEditor,a=(n.RichText,n.InspectorControls),i=n.MediaUpload,r=wp.components,o=r.TextControl,c=r.RadioControl,m=(wp.element.useState,wp.components),s=m.PanelBody,p=m.PanelRow;m.FormToggle;l("cgb/block-mim-img-sizes",{title:__("Bild div. Gr\xf6ssen"),icon:"format-image",category:"common",keywords:[__("mim-img \u2014 CGB Block")],attributes:{imgUrl:{type:"string",default:"http://placehold.it/300x200"},text:{type:"string"},selectedOption:{type:"string",default:"image--col-12"}},edit:function(e){function t(e){u({imgUrl:e.sizes.full.url})}function l(e){u({text:e})}var n=e.attributes,r=n.imgUrl,m=n.text,g=n.selectedOption,u=e.setAttributes,d=function(e){u({selectedOption:e})},w=[{label:"100% / 12 Spalten",value:"image--col-12"},{label:"11 Spalten",value:"image--col-11"},{label:"10 Spalten",value:"image--col-10"},{label:"9 Spalten",value:"image--col-9"},{label:"8 Spalten",value:"image--col-8"},{label:"7 Spalten",value:"image--col-7"},{label:"6 Spalten",value:"image--col-6"},{label:"5 Spalten",value:"image--col-5"},{label:"4 Spalten",value:"image--col-4"},{label:"3 Spalten",value:"image--col-3"}];return[wp.element.createElement(a,null,wp.element.createElement(s,{title:__("Bildgr\xf6ssen","imgsize")},wp.element.createElement(p,null,wp.element.createElement(c,{label:"W\xe4hle Gr\xf6sse",selected:g,options:w,onChange:d}))),wp.element.createElement(s,{title:__("Alt-text","alttxt")},wp.element.createElement(p,null,wp.element.createElement("label",{htmlFor:"high-contrast-form-toggle"}),wp.element.createElement(o,{id:"alt-ext",label:__("alt-text","alttext"),value:m,help:"Text for screenreader. Leave blank when image is just used as decorative",onChange:l})))),wp.element.createElement("figure",{className:"image "+g},wp.element.createElement(i,{onSelect:t,render:function(e){var t=e.open;return wp.element.createElement("img",{src:r,onClick:t})}}))]},save:function(e){var t=e.attributes,l=t.imgUrl,n=t.text,a=t.selectedOption;return wp.element.createElement("figure",{className:"image "+a},wp.element.createElement("img",{src:l,alt:n}))}})}]);
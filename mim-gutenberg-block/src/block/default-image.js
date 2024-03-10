// function setBlockCustomClassName(className, blockType, attributes) {
//     if (blockType === 'core/image') {
//         // console.log('className', className);
//         // console.log('blockType', blockType);
//         // console.log('attributes', attributes);
//         // console.log('----------attributes--------------');
//         // console.log(attributes);
//         // console.log('----------attributes--------------');

//         className.attributes = Object.assign( className.attributes, {
// 			isFullWidth:{ 
// 				type: 'boolean',
// 				default: true,
// 			}
// 		});
//     //   return attributes.isFullWidth ? 'image image--full-width' : 'image image--content-with';
//     }
//     return className;
//   }

// //   wp.blocks.registerBlockType('cgb/block-mim-img', {
// //     attributes: {
// //         imgUrl: 'http://placehold.it/300x200',
// //         isFullWidth: false,
// //         text: '',
// //         isCustomStyle: false, // Make sure this is set correctly
// //       }
// //   });

  
//   // Add custom style to the core/image block
// //   wp.blocks.registerBlockStyle('core/image', {
// //     name: 'image--full-width',
// //     label: 'Image Full Width',
// //     isDefault: true,
// //   });
  
//   // Add a filter for customizing the block class names
//   wp.hooks.addFilter(
//     'blocks.registerBlockType',
//     'my-plugin/set-block-custom-class-name',
//     setBlockCustomClassName
//   );

//   /**
//  * WordPress Dependencies
//  */
// const { __ } = wp.i18n;
// const { addFilter } = wp.hooks;
// const { Fragment }	= wp.element;
// const { InspectorAdvancedControls }	= wp.editor;
// const { createHigherOrderComponent } = wp.compose;
// const { ToggleControl } = wp.components;

// /**
//  * Add mobile visibility controls on Advanced Block Panel.
//  *
//  * @param {function} BlockEdit Block edit component.
//  *
//  * @return {function} BlockEdit Modified block edit component.
//  */

// const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
// 	return ( props ) => {

// 		const {
// 			attributes,
// 			setAttributes,
// 			isSelected,
// 		} = props;

// 		const {
// 			isFullWidth,
// 		} = attributes;
		
		
// 		return (
// 			<Fragment>
// 				<BlockEdit { ...props} />
// 				{ isSelected &&
// 					<InspectorAdvancedControls>
// 						<ToggleControl
// 							label={ __( 'Mobile Devices Visibity' ) }
// 							checked={ !! isFullWidth }
// 							onChange={ () => setAttributes( {  isFullWidth: ! isFullWidth } ) }
// 							help={ !! isFullWidth ? __( 'Showing on mobile devices.' ) : __( 'Hidden on mobile devices.' ) }
// 						/>
// 					</InspectorAdvancedControls>
// 				}

// 			</Fragment>
// 		);
// 	};
// }, 'withAdvancedControls');

// addFilter(
// 	'editor.BlockEdit',
// 	'editorskit/custom-advanced-control',
// 	withAdvancedControls
// );

// /**
//  * External Dependencies
//  */
// // import classnames from 'classnames';

// /**
//  * Add custom element class in save element.
//  *
//  * @param {Object} extraProps     Block element.
//  * @param {Object} blockType      Blocks object.
//  * @param {Object} attributes     Blocks attributes.
//  *
//  * @return {Object} extraProps Modified block element.
//  */
// // function applyExtraClass(extraProps, blockType, attributes) {
// //     const { isFullWidth } = attributes;
  
// //     // Check if attribute exists for old Gutenberg version compatibility
// //     // Add class only when visibleOnMobile = false
// //     if (typeof isFullWidth !== 'undefined') {
// //       let theClasses = extraProps.className || '';
  
// //       // Add the custom class to the existing classes
// //       extraProps.className = `${theClasses} image--full-with`;
// //     }
  
// //     return extraProps;
// //   }
  
// //   // Apply the applyExtraClass function to the blocks.getSaveContent.extraProps filter
// //   addFilter('blocks.getSaveContent.extraProps', 'editorskit/applyExtraClass', applyExtraClass);
  
// //   // Apply the applyExtraClass function to modify the rendered output of post content
// //   addFilter(
// //     'blocks.registerBlockType',
// //     'my-plugin/class-names/list-block',
// //     applyExtraClass
// // );

// // Our filter function
(function () {
    function addCustomImageClass(settings, name) {
        // console.log(settings, 'settings');
        // console.log(name, 'name');
        if (name === 'core/image') {
            return lodash.assign({}, settings, {
                attributes: lodash.assign({}, settings.attributes, {
                    className: {
                        type: 'string',
                        default: 'image',
                    },
                }),
            });
        }
        return settings;
    }

    // Extend the block functionality.
    wp.hooks.addFilter(
        'blocks.registerBlockType',
        'custom-image-class/custom-image-styles',
        addCustomImageClass
    );
})();
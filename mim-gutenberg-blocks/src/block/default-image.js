function setBlockCustomClassName( className, blockName ) {
    return blockName === 'core/image' ?
        'image image--content-with' :
        className;
}
 

wp.blocks.registerBlockStyle( 'core/image', {
    name: 'image--full-with',
    label: 'image full size',
    isDefault: true
} );


// Adding the filter
wp.hooks.addFilter(
    'blocks.getBlockDefaultClassName',
    'my-plugin/set-block-custom-class-name',
    setBlockCustomClassName
);
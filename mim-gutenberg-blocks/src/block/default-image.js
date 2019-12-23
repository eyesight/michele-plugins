function setBlockCustomClassName( className, blockName ) {
    return blockName === 'core/image' ?
        'image image--content-with' :
        className;
}
 
// Adding the filter
wp.hooks.addFilter(
    'blocks.getBlockDefaultClassName',
    'my-plugin/set-block-custom-class-name',
    setBlockCustomClassName
);

//wp.blocks.unregisterBlockStyle( 'core/image', 'large' );
(function () {

    function addImageClass(extraProps, blockType) {

        if (blockType.name !== 'core/image') {
            return extraProps;
        }

        extraProps.className = (

            extraProps.className || ''

        ) + ' image';

        return extraProps;

    }

    wp.hooks.addFilter(

        'blocks.getSaveContent.extraProps',

        'custom-image-class/add-class',

        addImageClass

    );

})();
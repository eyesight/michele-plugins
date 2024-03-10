import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
const { __ } = wp.i18n;
const ALLOWED_BLOCKS = [ 'cgb/block-mim-img-sizes' ];

registerBlockType( 'cgb/block-mim-image-container', {
    title: __( 'image-container' ), 
    icon: 'welcome-add-page',
    category: 'common',
    keywords: [ 
        __( 'image-container' )
    ], 
    getEditWrapperProps: function () {
        return {
            "data-align": "full"
        };
    },
    edit: function( props ) {
        return (
            <div className="content">
                <div className="grid-container image-container">
                    <InnerBlocks 
                        allowedBlocks={ ALLOWED_BLOCKS }
                    />
                </div>
            </div>
        );
    },
    save: function( props ) {
        return (
            <div className="content">
                <div className="grid-container image-container">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
} );
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
const { __ } = wp.i18n;
const { ToggleControl } = wp.components;

const ALLOWED_BLOCKS = [ 'cgb/block-mim-img-sizes' ];

registerBlockType( 'cgb/block-mim-image-container', {
    title: __( 'Bild-Container' ), 
    icon: 'welcome-add-page',
    category: 'common',
    keywords: [ 
        __( 'image-container' )
    ], 
    attributes: {
        addClassName: {
            type: 'boolean',
            default: false,
        },
    },
    getEditWrapperProps: function () {
        return {
            "data-align": "full"
        };
    },
    edit: function( props ) {
        const { attributes, setAttributes } = props;
        const { addClassName } = attributes;

        return (
            <div className="content">
                <ToggleControl
                    label={ __( 'Abstand zwischen Bilder' ) }
                    checked={ addClassName }
                    onChange={ () => setAttributes( { addClassName: !addClassName } ) }
                />
                <div className={ `grid-container image-container${ addClassName ? ' image-container--space-between' : '' }` }>
                    <InnerBlocks 
                        allowedBlocks={ ALLOWED_BLOCKS }
                    />
                </div>
            </div>
        );
    },
    save: function( props ) {
        const { attributes } = props;
        const { addClassName } = attributes;

        return (
            <div className="content">
                <div className={ `grid-container image-container${ addClassName ? ' image-container--space-between' : '' }` }>
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
} );

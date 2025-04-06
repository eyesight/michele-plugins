import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
const { __ } = wp.i18n;
const { ToggleControl } = wp.components;

const ALLOWED_BLOCKS = [ 'cgb/block-mim-img-sizes', 'core/video' ];

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
        isCentered: {
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
        const { addClassName, isCentered } = attributes;

        const containerClasses = [
            'grid-container',
            'image-container',
            addClassName ? 'image-container--space-between' : '',
            isCentered ? 'image-container--center' : ''
        ].join(' ').trim();

        return (
            <div className="content">
                <ToggleControl
                    label={ __( 'Abstand zwischen Bilder' ) }
                    checked={ addClassName }
                    onChange={ () => setAttributes( { addClassName: !addClassName } ) }
                />
                <ToggleControl
                    label={ __( 'Zentrieren' ) }
                    checked={ isCentered }
                    onChange={ () => setAttributes( { isCentered: !isCentered } ) }
                />
                <div className={ containerClasses }>
                    <InnerBlocks 
                        allowedBlocks={ ALLOWED_BLOCKS }
                    />
                </div>
            </div>
        );
    },
    save: function( props ) {
        const { attributes } = props;
        const { addClassName, isCentered } = attributes;

        const containerClasses = [
            'grid-container',
            'image-container',
            addClassName ? 'image-container--space-between' : '',
            isCentered ? 'image-container--center' : ''
        ].join(' ').trim();

        return (
            <div className="content">
                <div className={ containerClasses }>
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
} );

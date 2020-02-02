import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/editor';
const { __ } = wp.i18n;
const ALLOWED_BLOCKS = [ 'cgb/block-mim-list-item', 'cgb/block-mim-list-item-title' ];
<InnerBlocks
    allowedBlocks={ ALLOWED_BLOCKS }
/>
registerBlockType( 'cgb/block-mim-list-container', {
    title: __( 'list-container inner' ),
    icon: 'welcome-write-blog',
	category: 'common',
	keywords: [
		__( 'mim-list-container — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ), 
	],
    getEditWrapperProps: function () {
        return {
            "data-align": "full"
        };
    },
    edit: function( props ) {
        return (
			<div className='list__wrapper'>
				<InnerBlocks 
                    allowedBlocks={ ALLOWED_BLOCKS }
                />
			</div>
        );
    },
    save: function( props ) {
        return (
			<div className='list__wrapper'>
				<InnerBlocks.Content />
			</div>
        );
    },
} );
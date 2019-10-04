import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/editor';
const { __ } = wp.i18n;
const ALLOWED_BLOCKS = [ 'core/image', 'core/paragraph' ];
<InnerBlocks
    allowedBlocks={ ALLOWED_BLOCKS }
/>
registerBlockType( 'cgb/block-mim-list-outer-container', {
    title: __( 'mim-list-outer-container - CGB Block' ),
    icon: 'universal-access-alt',
	category: 'common',
	keywords: [
		__( 'mim-list-outer-container — CGB Block' ),
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
			<div class="content list">
        		<div class="grid-container list__container">
						<InnerBlocks />
				</div>
			</div>
        );
    },
    save: function( props ) {
        return (
            <div class="content list">
        		<div class="grid-container list__container">
                		<InnerBlocks.Content />
				</div>
			</div>
        );
    },
} );
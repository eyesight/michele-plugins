import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
const { __ } = wp.i18n;
const ALLOWED_BLOCKS = [ 'cgb/block-mim-list-container' ];
<InnerBlocks
    allowedBlocks={ ALLOWED_BLOCKS }
/>
registerBlockType( 'cgb/block-mim-list-outer-container', {
    title: __( 'list-container outer' ), 
    icon: 'welcome-add-page',
	category: 'common',
	keywords: [ 
		__( 'list-container outer' ), 
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
			<div className="content list">
        		<div className="grid-container list__container">
						<InnerBlocks 
                            allowedBlocks={ ALLOWED_BLOCKS }
                        />
				</div>
			</div>
        );
    },
    save: function( props ) {
        return (
            <div className="content list">
                <div className="grid-container list__container">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
} );
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
const { __ } = wp.i18n;

registerBlockType('cgb/block-mim-accordion', {
    title: __('Accordion'),
    icon: 'list-view',
    category: 'layout',
    edit: () => (
        <div className="accordion">
            <InnerBlocks allowedBlocks={['cgb/block-mim-accordion-item']} />
        </div>
    ),
    save: () => (
        <div className="accordion">
            <InnerBlocks.Content />
        </div>
    ),
});
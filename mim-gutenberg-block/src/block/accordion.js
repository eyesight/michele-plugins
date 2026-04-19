import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	useBlockProps
} from '@wordpress/block-editor';

const { __ } = wp.i18n;

registerBlockType('cgb/block-mim-accordion', {

	apiVersion: 3,

	title: __('Accordion'),
	icon: 'list-view',
	category: 'layout',

	edit: () => {

		const blockProps = useBlockProps({
			className: 'accordion'
		});

		return (
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={['cgb/block-mim-accordion-item']}
				/>
			</div>
		);

	},

	save: () => {

		const blockProps = useBlockProps.save({
			className: 'accordion'
		});

		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);

	}

});
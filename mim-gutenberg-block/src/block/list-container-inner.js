import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const { __ } = wp.i18n;

const ALLOWED_BLOCKS = [
	'cgb/block-mim-list-item',
	'cgb/block-mim-list-item-title'
];

registerBlockType('cgb/block-mim-list-container', {

	apiVersion: 3,

	title: __('list-container inner'),
	icon: 'welcome-write-blog',
	category: 'common',

	keywords: [
		__('mim-list-container — CGB Block'),
		__('CGB Example'),
		__('create-guten-block')
	],

	// ❌ nicht mehr nötig in modernem iframe editor
	// getEditWrapperProps() entfernt

	edit: () => {

		const blockProps = useBlockProps({
			className: 'list__wrapper'
		});

		return (
			<div {...blockProps}>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
			</div>
		);

	},

	save: () => {

		const blockProps = useBlockProps.save({
			className: 'list__wrapper'
		});

		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);

	}

});
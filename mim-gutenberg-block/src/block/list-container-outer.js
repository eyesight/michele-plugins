import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	useBlockProps
} from '@wordpress/block-editor';

const { __ } = wp.i18n;

const ALLOWED_BLOCKS = [
	'cgb/block-mim-list-container'
];

registerBlockType('cgb/block-mim-list-outer-container', {

	apiVersion: 3,

	title: __('list-container outer'),
	icon: 'welcome-add-page',
	category: 'common',

	keywords: [
		__('list-container outer'),
		__('CGB Example'),
		__('create-guten-block')
	],

	// ❌ nicht mehr nötig im iframe editor
	// getEditWrapperProps entfernt

	edit: () => {

		const blockProps = useBlockProps({
			className: 'content list'
		});

		return (
			<div {...blockProps}>
				<div className="grid-container list__container">
					<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
				</div>
			</div>
		);

	},

	save: () => {

		const blockProps = useBlockProps.save({
			className: 'content list'
		});

		return (
			<div {...blockProps}>
				<div className="grid-container list__container">
					<InnerBlocks.Content />
				</div>
			</div>
		);

	}

});
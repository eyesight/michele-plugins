const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	RichText,
	useBlockProps
} = wp.blockEditor;

registerBlockType('cgb/block-mim-text', {

	apiVersion: 3,

	title: __('text'),
	icon: 'editor-paragraph',
	category: 'common',

	keywords: [
		__('mim-text — CGB Block'),
		__('text'),
		__('copy')
	],

	attributes: {

		txt: {
			type: 'string'
		}

	},

	edit: (props) => {

		const { attributes: { txt }, setAttributes } = props;

		const blockProps = useBlockProps({
			className: 'paragraph content'
		});

		function onChangeTxt(newValue) {
			setAttributes({ txt: newValue });
		}

		return (

			<RichText
				{...blockProps}
				tagName="p"
				placeholder={__('Text')}
				value={txt}
				onChange={onChangeTxt}
			/>

		);

	},

	save: (props) => {

		const { attributes: { txt } } = props;

		const blockProps = useBlockProps.save({
			className: 'paragraph content'
		});

		return (

			<RichText.Content
				{...blockProps}
				tagName="p"
				value={txt}
			/>

		);

	}

});
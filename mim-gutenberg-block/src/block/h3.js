const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	RichText,
	useBlockProps
} = wp.blockEditor;

registerBlockType('cgb/block-mim-title-h3', {

	apiVersion: 3,

	title: __('title h3'),
	icon: 'shield',
	category: 'common',

	keywords: [
		__('mim-title-h3 — CGB Block'),
		__('h3'),
		__('title')
	],

	attributes: {

		txt: {
			type: 'string'
		}

	},

	edit: (props) => {

		const { attributes: { txt }, setAttributes } = props;

		const blockProps = useBlockProps({
			className: 'title-h3 content'
		});

		function onChangeTxt(newValue) {
			setAttributes({
				txt: newValue
			});
		}

		return (

			<RichText
				{...blockProps}
				tagName="h3"
				placeholder={__('Title')}
				value={txt}
				onChange={onChangeTxt}
			/>

		);

	},

	save: (props) => {

		const { attributes: { txt } } = props;

		const blockProps = useBlockProps.save({
			className: 'title-h3 content'
		});

		return (

			<RichText.Content
				{...blockProps}
				tagName="h3"
				value={txt}
			/>

		);

	}

});
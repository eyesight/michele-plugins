const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	RichText,
	useBlockProps
} = wp.blockEditor;

registerBlockType('cgb/block-mim-list-item-title', {

	apiVersion: 3,

	title: __('list-item title'),
	icon: 'editor-textcolor',
	category: 'common',

	keywords: [
		__('mim-list-item-title — CGB Block'),
		__('list'),
		__('item')
	],

	attributes: {

		txt: {
			type: 'string'
		}

	},

	edit: (props) => {

		const { attributes: { txt }, setAttributes } = props;

		const blockProps = useBlockProps({
			className: 'list__title'
		});

		function onChangeTxt(newValue) {
			setAttributes({ txt: newValue });
		}

		return (

			<RichText
				{...blockProps}
				tagName="h2"
				placeholder={__('List item')}
				value={txt}
				onChange={onChangeTxt}
			/>

		);

	},

	save: (props) => {

		const { attributes: { txt } } = props;

		const blockProps = useBlockProps.save({
			className: 'list__title'
		});

		return (

			<RichText.Content
				{...blockProps}
				tagName="h2"
				value={txt}
			/>

		);

	}

});
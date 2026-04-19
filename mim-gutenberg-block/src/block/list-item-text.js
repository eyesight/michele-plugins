const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	RichText,
	useBlockProps
} = wp.blockEditor;

registerBlockType('cgb/block-mim-list-item', {

	apiVersion: 3,

	title: __('list-item text'),
	icon: 'format-aside',
	category: 'common',

	keywords: [
		__('mim-list-item — CGB Block'),
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
			className: 'list__item'
		});

		function onChangeTxt(newValue) {
			setAttributes({ txt: newValue });
		}

		return (

			<RichText
				{...blockProps}
				tagName="p"
				placeholder={__('Listitem')}
				value={txt}
				onChange={onChangeTxt}
			/>

		);

	},

	save: (props) => {

		const { attributes: { txt } } = props;

		const blockProps = useBlockProps.save({
			className: 'list__item'
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
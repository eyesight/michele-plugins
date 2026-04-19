const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	RichText,
	InspectorControls,
	MediaUpload,
	useBlockProps
} = wp.blockEditor;

const {
	TextControl,
	PanelBody,
	PanelRow,
	FormToggle
} = wp.components;

const { Fragment } = wp.element;

registerBlockType('cgb/block-mim-img', {

	apiVersion: 3,

	title: __('Bild ganze Breite'),
	icon: 'format-image',
	category: 'common',

	attributes: {
		imgUrl: {
			type: 'string',
			default: 'https://placecats.com/300/200'
		},
		isFullWidth: {
			type: 'boolean',
			default: false
		},
		text: {
			type: 'string',
			default: ''
		},
		caption: {
			type: 'string',
			default: ''
		}
	},

	edit: (props) => {

		const {
			attributes: {
				isFullWidth,
				imgUrl,
				text,
				caption
			},
			setAttributes
		} = props;

		const blockProps = useBlockProps({
			className: !isFullWidth
				? 'image image--content-with'
				: 'image image--full-with'
		});

		function selectImage(media) {

			const url =
				(media && media.sizes && media.sizes.full && media.sizes.full.url) ||
				(media && media.sizes && media.sizes.large && media.sizes.large.url) ||
				(media && media.url) ||
				(media && media.source_url);

			if (url) {
				setAttributes({ imgUrl: url });
			}
		}

		function onChangeAltText(value) {
			setAttributes({ text: value });
		}

		function onChangeCaption(value) {
			setAttributes({ caption: value });
		}

		return (
			<Fragment>

				<InspectorControls>

					<PanelBody title={__('Image settings')}>

						<PanelRow>

							<label>{__('Full width')}</label>

							<FormToggle
								checked={isFullWidth}
								onChange={() =>
									setAttributes({ isFullWidth: !isFullWidth })
								}
							/>

						</PanelRow>

					</PanelBody>

					<PanelBody title={__('Bildtext')}>

						<PanelRow>

							<TextControl
								label={__('Bildlegende')}
								value={caption}
								onChange={onChangeCaption}
							/>

						</PanelRow>

						<PanelRow>

							<TextControl
								label={__('Alt-text')}
								value={text}
								onChange={onChangeAltText}
							/>

						</PanelRow>

					</PanelBody>

				</InspectorControls>

				<figure {...blockProps}>

					<MediaUpload
						onSelect={selectImage}
						allowedTypes={['image']}
						value={imgUrl}
						render={({ open }) => (
							<button
								type="button"
								onClick={open}
								style={{
									padding: 0,
									border: 0,
									background: 'none',
									cursor: 'pointer'
								}}
							>
								<img
									src={imgUrl}
									alt={text}
								/>
							</button>
						)}
					/>

					{caption && (
						<figcaption className="image__caption">
							{caption}
						</figcaption>
					)}

				</figure>

			</Fragment>
		);
	},

	save: (props) => {

		const {
			attributes: {
				isFullWidth,
				imgUrl,
				text,
				caption
			}
		} = props;

		const blockProps = useBlockProps.save({
			className: !isFullWidth
				? 'image image--content-with'
				: 'image image--full-with'
		});

		return (
			<figure {...blockProps}>

				<img src={imgUrl} alt={text} />

				{caption && (
					<figcaption className="image__caption">
						{caption}
					</figcaption>
				)}

			</figure>
		);
	}
});
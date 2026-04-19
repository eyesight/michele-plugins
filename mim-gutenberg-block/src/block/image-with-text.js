const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	InspectorControls,
	RichText,
	MediaUpload,
	useBlockProps
} = wp.blockEditor;

const {
	PanelBody,
	PanelRow,
	TextControl
} = wp.components;

const { Fragment } = wp.element;

registerBlockType('cgb/block-mim-img-txt', {

	apiVersion: 3,

	title: __('image with text'),
	icon: 'media-spreadsheet',
	category: 'common',

	attributes: {

		imgUrl: {
			type: 'string',
			default: 'https://placecats.com/400/300'
		},

		bodyContent: {
			type: 'string',
			default: ''
		},

		heading: {
			type: 'string',
			default: ''
		},

		text: {
			type: 'string',
			default: ''
		}

	},

	edit: (props) => {

		const {
			attributes: {
				imgUrl,
				bodyContent,
				heading,
				text
			},
			setAttributes
		} = props;

		const blockProps = useBlockProps({
			className: 'content image-with-text'
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

		return (

			<Fragment>

				<InspectorControls>

					<PanelBody title={__('Alt-text')}>

						<PanelRow>

							<TextControl
								label={__('alt-text')}
								value={text}
								help="Screenreader text"
								onChange={(value) =>
									setAttributes({ text: value })
								}
							/>

						</PanelRow>

					</PanelBody>

				</InspectorControls>

				<div {...blockProps}>

					<div className="grid-container image-with-text__container">

						<figure className="image-with-text__img">

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

						</figure>

						<div className="image-with-text__text">

							<RichText
								className="image-with-text__cat"
								tagName="p"
								placeholder="title"
								value={heading}
								onChange={(value) =>
									setAttributes({ heading: value })
								}
							/>

							<RichText
								className="image-with-text__txt"
								tagName="p"
								placeholder="Enter your text here"
								value={bodyContent}
								onChange={(value) =>
									setAttributes({ bodyContent: value })
								}
							/>

						</div>

					</div>

				</div>

			</Fragment>

		);

	},

	save: (props) => {

		const {
			attributes: {
				bodyContent,
				heading,
				imgUrl,
				text
			}
		} = props;

		const blockProps = useBlockProps.save({
			className: 'content image-with-text'
		});

		return (

			<div {...blockProps}>

				<div className="grid-container image-with-text__container">

					<figure className="image-with-text__img">
						<img src={imgUrl} alt={text} />
					</figure>

					<div className="image-with-text__text">

						<RichText.Content
							className="image-with-text__cat"
							tagName="p"
							value={heading}
						/>

						<RichText.Content
							className="image-with-text__txt"
							tagName="p"
							value={bodyContent}
						/>

					</div>

				</div>

			</div>

		);

	}

});